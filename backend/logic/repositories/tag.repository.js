module.exports = (TagModel, SocketHelper) => {
  function _transformTag (tag) {
    return {
      "id": tag._id,
      "name": tag.name,
      "created": tag.createdAt,
      "updated": tag.updatedAt 
    }
  }

  async function getAll () {
    const tags = await TagModel.find({}).lean();
    return tags.map(this._transformTag);
  }

  async function getById (id) {
    const tag = await TagModel.findById(id).lean();
    return this._transformTag(tag);
  }

  async function createNewTag (name) {
    await TagModel.findOne({ name }).lean();
    const createdTag = await new TagModel({ name }).save();
    const transformedTag = this._transformTag(createdTag);
    SocketHelper.publishChanges(SocketHelper.EVENTNAME.TAGADDED, transformedTag);    
    return transformedTag
  }

  async function updateById (id, name) {
    const body = { name };
    const updatedTag = await TagModel.findByIdAndUpdate({ _id: id, }, { $set: body }, { new: true }).lean();
    const transformedTag = this._transformTag(updatedTag);
    SocketHelper.publishChanges(SocketHelper.EVENTNAME.TAGUPDATED, transformedTag);    
    return transformedTag;
  }

  async function deleteById (id) {
    await TagModel.findByIdAndRemove({ _id: id });
    SocketHelper.publishChanges(SocketHelper.EVENTNAME.TAGDELETED, id);    
    return { id };
  }

  return {
    _transformTag,
    getAll,
    getById,
    createNewTag,
    updateById,
    deleteById
  }
}