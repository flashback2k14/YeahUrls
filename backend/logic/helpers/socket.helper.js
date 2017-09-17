module.exports = (sio) => {

  const EVENTNAME = {
    URLADDED : "url_added",
    URLUPDATED : "url_updated",
    URLDELETED : "url_deleted",
    TAGADDED : "tag_added",
    TAGUPDATED : "tag_updated",
    TAGDELETED : "tag_deleted"
  };

  function publishChanges (eventName, changedObject) {
    sio.emit(eventName, changedObject);
  }

  return {
    EVENTNAME,
    publishChanges
  }
}
