import React from "react";
import { useRef, useState } from 'react';
import style from './FormCalculatingCarLease.module.scss'

export const FormCalculatingCarLease: React.FC = () => {

    const inputRangeCar = useRef<HTMLInputElement>(null)
    const inputTextProceAvto = useRef<HTMLInputElement>(null)
    const inputRageProgressCarPrice = useRef<HTMLInputElement>(null)

    const inputRangeInitialFee = useRef<HTMLInputElement>(null)
    const inputTextInitialFee = useRef<HTMLInputElement>(null)
    const inputRageProgressInitialFee = useRef<HTMLInputElement>(null)

    const inputRangeMonth = useRef<HTMLInputElement>(null)
    const inputTextMounth = useRef<HTMLInputElement>(null)
    const inputRageProgressMounth = useRef<HTMLInputElement>(null)

    const inputChangeRangeCarCost = () => {
        const percentInputRage = Math.floor((+inputRangeCar.current!.value - 1000000) / (6000000 - 1000000) * 100)
        // const percentInputRage = Math.floor(+inputRange.current!.value * 100 / 6000000)

        const rangeValue = +inputRangeCar.current!.value;
        const price = rangeValue.toLocaleString();

        inputTextProceAvto.current!.value = `${price}`
        inputRageProgressCarPrice.current!.style.width = `${percentInputRage}%`
    }

    const inputChangeRangeInitialFee = () => {
        const percentInputRageInitialFee = Math.floor((+inputRangeInitialFee.current!.value - 10) / (60 - 10) * 100)

        inputRageProgressInitialFee.current!.style.width = `${percentInputRageInitialFee}%`
    }

    const inputChangeRangeMounth = () => {
        const percentInputRageInitialFee = Math.floor((+inputRangeMonth.current!.value - 1) / (60 - 1) * 100)
        
        const rangeValue = +inputRangeMonth.current!.value;
        const mounth = rangeValue.toLocaleString();

        inputTextMounth.current!.value = `${mounth}`
        inputRageProgressMounth.current!.style.width = `${percentInputRageInitialFee}%`
    }

    return (
        <form className={style.formCalculatingCarLease} action="">
            <h1 className={style.formCalculatingCarLease__title}>
                Рассчитайте стоимость автомобиля в лизинг
            </h1>
            <ul className={style.formCalculatingCarLease__list}>
                <li className={style.formCalculatingCarLease__item}>
                    <h3 className={style.formCalculatingCarLease__headline}>Стоимость автомобиля</h3>
                    <div className={style.formCalculatingCarLease__wrapperInput}>
                        <input ref={inputTextProceAvto} type="text" className={style.formCalculatingCarLease__inputText} placeholder='3 300 000' />
                        <span className={style.formCalculatingCarLease__currency}>₽</span>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeCar} onInput={(() => inputChangeRangeCarCost())}
                                min="1000000"
                                max="6000000"
                                step="1"
                                type="range"
                                className={style.formCalculatingCarLease__inputRange}
                            />
                            <div ref={inputRageProgressCarPrice} className={style.formCalculatingCarLease__progress}></div>
                        </div>
                    </div>
                </li>
                <li className={style.formCalculatingCarLease__item}>
                    <h3 className={style.formCalculatingCarLease__headline}>Первоначальный взнос</h3>
                    <div className={style.formCalculatingCarLease__wrapperInput}>
                        <input type="text" className={style.formCalculatingCarLease__inputText} placeholder='420 000 ₽' />
                        <span className={style.formCalculatingCarLease__interestRate}>13%</span>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeInitialFee} onInput={(() => inputChangeRangeInitialFee())}
                                min="10"
                                max="60"
                                step="1"
                                type="range"
                                className={style.formCalculatingCarLease__inputRange}
                            />
                            <div ref={inputRageProgressInitialFee} className={style.formCalculatingCarLease__progressInitialFee}></div>
                        </div>
                    </div>
                </li>
                <li className={style.formCalculatingCarLease__item}>
                    <h3 className={style.formCalculatingCarLease__headline}>Срок лизинга</h3>
                    <div className={style.formCalculatingCarLease__wrapperInput}>
                        <input type="text" ref={inputTextMounth} className={style.formCalculatingCarLease__inputText} placeholder='60' />
                        <span className={style.formCalculatingCarLease__month}>мес.</span>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeMonth} onInput={(() => inputChangeRangeMounth())}
                                min="1"
                                max="60"
                                step="1"
                                type="range"
                                className={style.formCalculatingCarLease__inputRange}
                            />
                            <div ref={inputRageProgressMounth} className={style.formCalculatingCarLease__progressMounth}></div>
                        </div>
                    </div>
                </li>
            </ul>

            <div className={style.calculationAmount}>
                <div className={style.calculationAmount__item}>
                    <h3 className={style.calculationAmount__title}>Сумма договора лизинга</h3>
                    <div className={style.calculationAmount__summa}>4 467 313 ₽</div>
                </div>
                <div className={style.calculationAmount__item}>
                    <h3 className={style.calculationAmount__title}>Ежемесячный платеж от</h3>
                    <div className={style.calculationAmount__summa}>114 445 ₽</div>
                </div>
                <button className={style.calculationAmount__submit}>Оставить заявку</button>
            </div>
        </form>
    )
}