module.exports = (TagModel, UrlModel, SocketHelper) => {
  function _transformTag(tag) {
    return {
      id: tag._id,
      name: tag.name,
      created: tag.createdAt,
      updated: tag.updatedAt
    };
  }

  async function _getTagCount() {
    const tags = await UrlModel.find({}, { tags: 1, _id: 0 }).lean();

    let tagIdsWithDuplicates = [];

    tags.forEach(tagObj => {
      tagObj.tags.forEach(tag => {
        tagIdsWithDuplicates.push(tag);
      });
    });

    return tagIdsWithDuplicates.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
  }

  async function _getTagCountById(id) {
    const tagCountObj = await this._getTagCount();
    const objKey = Object.keys(tagCountObj).filter(key => key === id)[0];
    return tagCountObj[objKey];
  }

  function _extend(tags, tagCount) {
    const formattedTagCount = Object.keys(tagCount).map(key => {
      return {
        id: key,
        count: tagCount[key]
      };
    });

    const extendedTags = [];

    tags.forEach(tag => {
      formattedTagCount.forEach(tagCount => {
        if (tag.id.toHexString() === tagCount.id) {
          tag.count = tagCount.count;
          extendedTags.push(tag);
        }
      });
    });

    const currentSet = new Set(extendedTags);
    const missingTags = tags
      .filter(tag => !currentSet.has(tag))
      .map(tag => ({ ...tag, count: 0 }));

    return [...missingTags, ...extendedTags];
  }

  function _extendSingle(tag, count) {
    return { ...this._transformTag(tag), count };
  }

  async function getAll() {
    const tagCount = await this._getTagCount();
    const tags = await TagModel.find({}).lean();
    const formattedTags = tags.map(this._transformTag);
    return this._extend(formattedTags, tagCount);
  }

  async function getById(id) {
    const count = await this._getTagCountById(id);
    const tag = await TagModel.findById(id).lean();
    return this._extendSingle(tag, count);
  }

  async function createNewTag(name) {
    await TagModel.findOne({ name }).lean();
    const createdTag = await new TagModel({ name }).save();

    const transformedTag = this._extendSingle(createdTag, 1);

    SocketHelper.publishChanges(
      SocketHelper.EVENTNAME.TAGADDED,
      transformedTag
    );
    return transformedTag;
  }

  async function updateById(id, name) {
    const body = { name };
    const updatedTag = await TagModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    ).lean();

    const count = await this._getTagCountById(id);
    const transformedTag = this._extendSingle(updatedTag, count);

    SocketHelper.publishChanges(
      SocketHelper.EVENTNAME.TAGUPDATED,
      transformedTag
    );
    return transformedTag;
  }

  async function deleteById(id) {
    await TagModel.findByIdAndRemove({ _id: id });
    SocketHelper.publishChanges(SocketHelper.EVENTNAME.TAGDELETED, id);
    return { id };
  }

  return {
    _transformTag,
    _getTagCount,
    _getTagCountById,
    _extend,
    _extendSingle,
    getAll,
    getById,
    createNewTag,
    updateById,
    deleteById
  };
};
