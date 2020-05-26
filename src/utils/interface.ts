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
  title:string
}

export interface UniAppAxiosError<T> extends Error {
  data:T
}