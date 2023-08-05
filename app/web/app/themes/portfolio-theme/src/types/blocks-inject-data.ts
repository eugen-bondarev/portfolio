import { Project } from './product'

export interface BlocksInjectData {
  projects?: Project[]
}

export const getBlocksInjectData = () =>
  ((window as any).blocksInjectData as BlocksInjectData) || {}
