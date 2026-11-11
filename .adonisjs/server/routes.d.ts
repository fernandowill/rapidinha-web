import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'videos_create': { paramsTuple?: []; params?: {} }
    'videos_created': { paramsTuple?: []; params?: {} }
    'videos.store': { paramsTuple?: []; params?: {} }
    'videos_destroy': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
    'admin_users': { paramsTuple?: []; params?: {} }
    'admin_videos': { paramsTuple?: []; params?: {} }
    'admin_videos_destroy': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
    'video_show': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'videos_create': { paramsTuple?: []; params?: {} }
    'videos_created': { paramsTuple?: []; params?: {} }
    'admin_users': { paramsTuple?: []; params?: {} }
    'admin_videos': { paramsTuple?: []; params?: {} }
    'video_show': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'videos_create': { paramsTuple?: []; params?: {} }
    'videos_created': { paramsTuple?: []; params?: {} }
    'admin_users': { paramsTuple?: []; params?: {} }
    'admin_videos': { paramsTuple?: []; params?: {} }
    'video_show': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'videos.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'videos_destroy': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
    'admin_videos_destroy': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}