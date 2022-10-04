import React from "react";
import { useRef, useState } from 'react';
import style from './FormCalculatingCarLease.module.scss'

export const FormCalculatingCarLease: React.FC = () => {

    const inputRangeCar = useRef<HTMLInputElement>(null)
    const inputTextProceAvto = useRef<HTMLInputElement>(null)
    const inputRageProgressCarPrice = useRef<HTMLInputElement>(null)
    const [defaultSumCar, setDefaultSumCar] = useState(3300000)

    const inputRangeInitialFee = useRef<HTMLInputElement>(null)
    const inputTextInitialFee = useRef<HTMLInputElement>(null)
    const inputRageProgressInitialFee = useRef<HTMLInputElement>(null)
    const [percentageCar, setPercentageCar] = useState(30)

    const inputRangeMonth = useRef<HTMLInputElement>(null)
    const inputTextMounth = useRef<HTMLInputElement>(null)
    const inputRageProgressMounth = useRef<HTMLInputElement>(null)
    const [mounthCount, setMounthCount] = useState(20)

    const sliderProgressCalculation = (valueRange: number, min: number, max: number) => {
        return Math.floor((valueRange - min) / (max - min) * 100)
    }
    const percentInputRage = sliderProgressCalculation(defaultSumCar, 1000000, 6000000)
    const percentInputRageInitialFee = sliderProgressCalculation(percentageCar, 10, 60)
    const percentInputRageMounth = sliderProgressCalculation(mounthCount, 1, 60)

    const initialFee = Math.floor((defaultSumCar / 100) * percentageCar);

    const monthPay = (defaultSumCar - initialFee) * ((0.035 * Math.pow((1 + 0.035), mounthCount)) /
        (Math.pow((1 + 0.035), mounthCount) - 1));

    const amountLeaseAgreement = initialFee + mounthCount * monthPay

    const inputChangeRangeCarCost = () => {
        const inputRangeValue = +inputRangeCar.current!.value
        setDefaultSumCar(prev => prev = inputRangeValue)

        inputTextProceAvto.current!.value = inputRangeValue.toLocaleString()
        inputRageProgressCarPrice.current!.style.width = `${percentInputRage}%`
    }

    const inputChangeRangeInitialFee = () => {
        const inputRangeValueInitialFee = +inputRangeInitialFee.current!.value
        setPercentageCar(prev => prev = inputRangeValueInitialFee)

        inputTextInitialFee.current!.value = initialFee.toLocaleString()
        inputRageProgressInitialFee.current!.style.width = `${percentInputRageInitialFee}%`
    }

    const inputChangeRangeMounth = () => {
        const inputRangeValue = +inputRangeMonth.current!.value
        setMounthCount(prev => prev = inputRangeValue)

        inputTextMounth.current!.value = `${inputRangeValue}`
        inputRageProgressMounth.current!.style.width = `${percentInputRageMounth}%`
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
                        <input
                            ref={inputTextProceAvto} type="text"
                            className={style.formCalculatingCarLease__inputText}
                            readOnly
                            value={`${defaultSumCar.toLocaleString()} ₽`}
                        />
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeCar} onInput={(() => inputChangeRangeCarCost())}
                                min="1000000"
                                max="6000000"
                                value={defaultSumCar}
                                step="100"
                                type="range"
                                className={style.formCalculatingCarLease__inputRange}
                            />
                            <div
                                ref={inputRageProgressCarPrice}
                                style={{ width: `${percentInputRage}%` }}
                                className={style.formCalculatingCarLease__progress}>
                            </div>
                        </div>
                    </div>
                </li>
                <li className={style.formCalculatingCarLease__item}>
                    <h3 className={style.formCalculatingCarLease__headline}>Первоначальный взнос</h3>
                    <div className={style.formCalculatingCarLease__wrapperInput}>
                        <input type="text"
                            ref={inputTextInitialFee}
                            className={style.formCalculatingCarLease__inputText}
                            readOnly
                            value={`${initialFee.toLocaleString()} ₽`} />
                        <span className={style.formCalculatingCarLease__interestRate}>{percentageCar}%</span>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeInitialFee} onInput={(() => inputChangeRangeInitialFee())}
                                min="10"
                                max="60"
                                value={percentageCar}
                                step="1"
                                type="range"
                                className={style.formCalculatingCarLease__inputRange}
                            />
                            <div
                                ref={inputRageProgressInitialFee}
                                style={{ width: `${percentInputRageInitialFee}%` }}
                                className={style.formCalculatingCarLease__progressInitialFee}>
                            </div>
                        </div>
                    </div>
                </li>
                <li className={style.formCalculatingCarLease__item}>
                    <h3 className={style.formCalculatingCarLease__headline}>Срок лизинга</h3>
                    <div className={style.formCalculatingCarLease__wrapperInput}>
                        <input
                            type="text"
                            ref={inputTextMounth}
                            className={style.formCalculatingCarLease__inputText}
                            defaultValue={mounthCount}
                        />
                        <span className={style.formCalculatingCarLease__month}>мес.</span>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeMonth} onInput={(() => inputChangeRangeMounth())}
                                min="1"
                                max="60"
                                value={mounthCount}
                                step="1"
                                type="range"
                                className={style.formCalculatingCarLease__inputRange}
                            />
                            <div
                                ref={inputRageProgressMounth}
                                style={{ width: `${percentInputRageMounth}%` }}
                                className={style.formCalculatingCarLease__progressMounth}>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <div className={style.calculationAmount}>
                <div className={style.calculationAmount__item}>
                    <h3 className={style.calculationAmount__title}>Сумма договора лизинга</h3>
                    <div className={style.calculationAmount__summa}>{Math.floor(amountLeaseAgreement).toLocaleString()} ₽</div>
                </div>
                <div className={style.calculationAmount__item}>
                    <h3 className={style.calculationAmount__title}>Ежемесячный платеж от</h3>
                    <div className={style.calculationAmount__summa}>{Math.floor(monthPay).toLocaleString()} ₽</div>
                </div>
                <button className={style.calculationAmount__submit}>Оставить заявку</button>
            </div>
        </form>
    )
}