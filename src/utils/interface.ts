export interface Application {
  mpType:string
  onLaunch():void
  onShow():void
  onHide():void
}

export interface NavItem {
  name:string
  path:string
}

export interface Technology {
  id:number | string
  name:string
}

/**
 * reader: 阅读数量
 * messages: 评论数量
 */
export interface Article {
  id:number | string
  createtime:string
  title:string
  reader:number
  messages:number
}

export interface UniAppAxiosError<T> extends Error {
  data:T
}