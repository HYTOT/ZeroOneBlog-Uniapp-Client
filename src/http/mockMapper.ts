import Mock from 'mockjs'
import { MockDatas } from './../utils/type'

const technology:Function = ():MockDatas => {
  return Mock.mock({
    "list|10": [{
      "id|+1": 0,
      "title": "@cname",
    }]
  }).list
}

export const mockMapper:{ [index:string]:MockDatas } = {
  '/technology': technology(),
}