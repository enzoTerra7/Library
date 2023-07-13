export declare class UserDTO {
    id?: string;
    name: string;
    email: string;
    password: string;
}
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Partial<UserDTO>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
}
export {};
