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

  async function getByUserIdAndUrlId (userId, urlId) {
    const url = await UrlModel.findOne({ _id: urlId, user: userId }).lean();
    return this._transformUrl(url);
  }

  async function updateByUserIdAndUrlId (userId, urlId, url) {
    // check if the user is available
    await UserModel.findById(userId).lean();
    // update url object
    const body = { url };
    const updatedUrl = await UrlModel.findByIdAndUpdate({ _id: urlId, }, { $set: body }, { new: true }).lean();
    // return data
    return this._transformUrl(updatedUrl);
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
    };
  }

  async function createNewTagForUserIdAndUrlId (userId, urlId, body) {
    // check if the user is available
    await UserModel.findById(userId).lean();
    // get tag ids
    const tagIds = await this._createNewTags(body.tags);
    // get Url Object
    const foundUrl = await UrlModel.findById(urlId);
    // add new tags
    foundUrl.tags.push(tagIds);
    // save url object
    const updatedUrl = await foundUrl.save();
    // return data
    return {
      url: this._transformUrl(updatedUrl)
    };
  }

  async function deleteByUserIdAndUrlId (userId, urlId) {
    // check if the user is available
    await UserModel.findById(userId).lean();
    // delete url object
    await UrlModel.findByIdAndRemove({ _id: urlId });
    // return data
    return { urlId };
  }

  async function deleteTagByUserIdAndUrlId (userId, urlId, tagId) {
    // check if the user is available
    await UserModel.findById(userId).lean();
    // find url object
    const foundUrl = await UrlModel.findById({ _id: urlId });
    // remove tag id
    const tagIndex = foundUrl.tags.indexOf(tagId);
    if (tagIndex !== -1) foundUrl.tags.splice(tagIndex, 1);
    // save url object
    const updatedUrl = await foundUrl.save();
    // return data
    return {
      url: this._transformUrl(updatedUrl)
    };
  }

  return {
    _createNewTags,
    _transformUrl,
    getAll,
    getAllByUserId,
    getByUserIdAndUrlId,
    updateByUserIdAndUrlId,
    createNewUrlForUserId,
    createNewTagForUserIdAndUrlId,
    deleteByUserIdAndUrlId,
    deleteTagByUserIdAndUrlId
  }
}
