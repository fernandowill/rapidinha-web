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
    'users.index': { paramsTuple?: []; params?: {} }
    'videos_create': { paramsTuple?: []; params?: {} }
    'videos.store': { paramsTuple?: []; params?: {} }
    'video_show': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
    'olas.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'videos_create': { paramsTuple?: []; params?: {} }
    'video_show': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
    'olas.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'videos_create': { paramsTuple?: []; params?: {} }
    'video_show': { paramsTuple: [ParamValue]; params: {'publicId': ParamValue} }
    'olas.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'videos.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}