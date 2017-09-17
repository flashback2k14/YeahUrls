module.exports = (UrlModel, TagModel, UserModel) => {

  async function _createNewTags (tags) {
    return await Promise.all(tags.map(async tag => {
      // search for tag if already created
      let foundTag = await TagModel.findOne({ name: tag }).lean();
      // if no tag is found then create a new tag
      if (!foundTag) foundTag = await new TagModel({ name: tag }).save();
      // return tag id
      return foundTag._id;
    }));
  }

  function _transformUrl (url) {
    return {
      "id": url._id,
      "url": url.url,
      "user": url.user,
      "tags": url.tags,
      "created": url.createdAt,
      "updated": url.updatedAt 
    }
  }

  async function getAll () {
    const urls = await UrlModel.find({}).lean();
    return urls.map(this._transformUrl);
  }

  async function getAllByUserId (userId) {
    const urls = await UrlModel.find({ user: userId }).lean();
    return urls.map(this._transformUrl);
  }

  async function createNewUrlForUserId (userId, body) {
    // check if the user is available
    await UserModel.findById(userId).lean();
    // get tag ids
    const tagIds = await this._createNewTags(body.tags);
    // create new url object
    const newUrl = new UrlModel({
      url: body.url,
      user: userId,
      tags: tagIds
    });
    // save new url object
    const createdUrl = await newUrl.save();
    // return data
    return {
      url: this._transformUrl(createdUrl)
    }
  }

  return {
    _createNewTags,
    _transformUrl,
    getAll,
    getAllByUserId,
    createNewUrlForUserId
  }
}
