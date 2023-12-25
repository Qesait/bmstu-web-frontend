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
    formation_date: string
    completion_date: string
    moderator: string
    customer: string
    transport: string
    delivery_status: string
}