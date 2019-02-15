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

    return extendedTags;
  }

  async function getAll() {
    const tagCount = await this._getTagCount();
    const tags = await TagModel.find({}).lean();
    const formattedTags = tags.map(this._transformTag);
    return this._extend(formattedTags, tagCount);
  }

  async function getById(id) {
    const tag = await TagModel.findById(id).lean();
    return this._transformTag(tag);
  }

  async function createNewTag(name) {
    await TagModel.findOne({ name }).lean();
    const createdTag = await new TagModel({ name }).save();
    const transformedTag = this._transformTag(createdTag);
    transformedTag.count = 1;
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
    const transformedTag = this._transformTag(updatedTag);
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
    _extend,
    getAll,
    getById,
    createNewTag,
    updateById,
    deleteById
  };
};
