import React from "react";
import { FormCalculatingCarLease } from "../FormCalculatingCarLease/FormCalculatingCarLease";
import style from './Container.module.scss'

export const Container: React.FC = () => {
    return (
        <div className={style.container}>
            <FormCalculatingCarLease />
        </div>
    )
}