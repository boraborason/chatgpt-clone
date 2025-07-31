import { Button, ButtonProps } from "../button";

export function Submit({children, ...others}: ButtonProps) {
    return <Button type="submit" {...others} >{children}</Button>
}