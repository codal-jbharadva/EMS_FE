export interface CardProps {
        admin_id:number,
        completed:number,
        description: string,
        header_img: string,
        id: number,
        name: string,
        place: string,
        registration_fee: number,
        tagline: string,
        start_date: Date;
        end_date: Date,
        address: string,
}

export interface response{
        
}

export interface blogProps{
        author: number,
        content: string,
        coverImage: string,
        description: string,
        id: number,
        slug: string,
        title: string,
}

export interface userProps{
        email: string,
        id: number,
        name: string, 
        number: string,
        password?: string,
        profilePhoto: string | null,
        role: string,
}