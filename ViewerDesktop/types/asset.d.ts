interface Asset extends BasicData {
  remark: string
  parent_id: number
  asset_id: number
  asset_name: string
  asset_type: TassetType
  visible: Tvisible
  sort: number
  vip: Tvip
  url: string
}

type TassetType = 'DIR' | 'PDF' | 'PCB' | 'BRD' | 'GBR'
type Tvisible = 0 | 1
type Tvip = 0 | 1
