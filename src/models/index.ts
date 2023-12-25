export interface IContainer {
    uuid: string
    marking: string
    type: string
    length: number
    height: number
    width: number
    image_url: string
    cargo: string
    weight: number
}

export interface ITransportation {
    uuid: string
    status: string
    creation_date: string
    formation_date: string | null
    completion_date: string | null
    moderator: string | null
    customer: string
    transport: string | null
    delivery_status: string | null
}