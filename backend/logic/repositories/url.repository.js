module.exports = (UrlModel, TagModel, UserModel, SocketHelper) => {
  /**
   * PRIVATE API
   */

  function _transformTag(tag) {
    return {
      id: tag._id,
      name: tag.name,
      created: tag.createdAt,
      updated: tag.updatedAt
    };
  }

  async function _getTagsFromUrl(tags) {
    return await Promise.all(
      tags.map(async tag => {
        return this._transformTag(await TagModel.findById(tag).lean());
      })
    );
  }

  async function _transformUrl(url) {
    return {
      id: url._id,
      url: url.url,
      user: url.user,
      tags: await this._getTagsFromUrl(url.tags),
      created: url.createdAt,
      updated: url.updatedAt
    };
  }

  async function _transformAllUrls(urls) {
    return await Promise.all(
      urls.map(async url => {
        return await this._transformUrl(url);
      })
    );
  }

  async function _createNewTags(tags) {
    return await Promise.all(
      tags.map(async tag => {
        let foundOrCreatedTag = await TagModel.findOne({ name: tag }).lean();
        if (!foundOrCreatedTag) {
          foundOrCreatedTag = await new TagModel({ name: tag }).save();
          SocketHelper.publishChanges(SocketHelper.EVENTNAME.TAGADDED, this._transformTag(foundOrCreatedTag));
        }
        return foundOrCreatedTag._id;
      })
    );
  }

  /**
   * PUBLIC API
   */

  async function getAll() {
    const urls = await UrlModel.find({}).lean();
    return await this._transformAllUrls(urls);
  }

  async function getAllByUserId(userId) {
    const urls = await UrlModel.find({ user: userId }).lean();
    return await this._transformAllUrls(urls);
  }

  async function getByUserIdAndUrlId(userId, urlId) {
    const url = await UrlModel.findOne({ _id: urlId, user: userId }).lean();
    return await this._transformUrl(url);
  }

  async function findDuplicatesByUserId(userId, isLean) {
    const foundDups = await UrlModel.aggregate([
      {
        $group: {
          _id: { URL: "$url" },
          duplicateUrlIds: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ]);
    return isLean
      ? foundDups
      : await Promise.all(
          foundDups.map(async dup => {
            dup.duplicateUrls = await Promise.all(
              dup.duplicateUrlIds.map(urlId => {
                return this.getByUserIdAndUrlId(userId, urlId);
              })
            );
            return dup;
          })
        );
  }

  async function getLastUpdated(userId) {
    const urls = await UrlModel.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(1)
      .lean();
    return { lastUpdated: urls[0].updatedAt };
  }

  async function updateByUserIdAndUrlId(userId, urlId, body) {
    await UserModel.findById(userId).lean();
    const tagIds = await this._createNewTags(body.tags);

    const modifiedUrl = {
      url: body.url,
      tags: tagIds
    };

    const updatedUrl = await UrlModel.findByIdAndUpdate({ _id: urlId }, { $set: modifiedUrl }, { new: true }).lean();
    const transformedUrl = await this._transformUrl(updatedUrl);

    SocketHelper.publishChanges(SocketHelper.EVENTNAME.URLUPDATED, transformedUrl);
    return transformedUrl;
  }

  async function createNewUrlForUserId(userId, body) {
    await UserModel.findById(userId).lean();
    const tagIds = await this._createNewTags(body.tags);

    const newUrl = new UrlModel({
      url: body.url,
      user: userId,
      tags: tagIds
    });

    const createdUrl = await newUrl.save();
    const transformedUrl = await this._transformUrl(createdUrl);

    SocketHelper.publishChanges(SocketHelper.EVENTNAME.URLADDED, transformedUrl);
    return transformedUrl;
  }

  async function createNewTagForUserIdAndUrlId(userId, urlId, body) {
    await UserModel.findById(userId).lean();
    const tagIds = await this._createNewTags(body.tags);

    const foundUrl = await UrlModel.findById(urlId);
    foundUrl.tags.push(tagIds);

    const updatedUrl = await foundUrl.save();
    const transformedUrl = await this._transformUrl(updatedUrl);

    SocketHelper.publishChanges(SocketHelper.EVENTNAME.URLADDED, transformedUrl);
    return transformedUrl;
  }

  async function deleteByUserIdAndUrlId(userId, urlId) {
    await UserModel.findById(userId).lean();
    await UrlModel.findByIdAndRemove({ _id: urlId });
    SocketHelper.publishChanges(SocketHelper.EVENTNAME.URLDELETED, { urlId });
    return { urlId };
  }

  async function deleteTagByUserIdAndUrlId(userId, urlId, tagId) {
    await UserModel.findById(userId).lean();
    const foundUrl = await UrlModel.findById({ _id: urlId });

    const tagIndex = foundUrl.tags.indexOf(tagId);
    if (tagIndex !== -1) {
      foundUrl.tags.splice(tagIndex, 1);
    }

    const updatedUrl = await foundUrl.save();
    const transformedUrl = await this._transformUrl(updatedUrl);

    SocketHelper.publishChanges(SocketHelper.EVENTNAME.URLADDED, transformedUrl);
    return transformedUrl;
  }

  return {
    _createNewTags,
    _getTagsFromUrl,
    _transformTag,
    _transformUrl,
    _transformAllUrls,
    getAll,
    getAllByUserId,
    getByUserIdAndUrlId,
    findDuplicatesByUserId,
    getLastUpdated,
    updateByUserIdAndUrlId,
    createNewUrlForUserId,
    createNewTagForUserIdAndUrlId,
    deleteByUserIdAndUrlId,
    deleteTagByUserIdAndUrlId
  };
};
