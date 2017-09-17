module.exports = (TagModel) => {
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
    return this._transformTag(createdTag);
  }

  async function updateById (id, name) {
    const body = { name };
    const updatedTag = await TagModel.findByIdAndUpdate({ _id: id, }, { $set: body }, { new: true }).lean();
    return this._transformTag(updatedTag);
  }

  async function deleteById (id) {
    await TagModel.findByIdAndRemove({ _id: id });
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