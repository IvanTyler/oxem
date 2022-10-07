import React from "react";
import { useRef, useState } from 'react';
import axios from 'axios';
import style from './FormCalculatingCarLease.module.scss'
import { BACKEND_HOST } from "../Constants/constants";

export const FormCalculatingCarLease: React.FC = () => {

    const [sendData, setSendData] = useState(false)

    const inputRangeCar = useRef<HTMLInputElement>(null)
    const inputTextProceAvto = useRef<HTMLInputElement>(null)
    const inputRageProgressCarPrice = useRef<HTMLInputElement>(null)
    const [defaultSumCar, setDefaultSumCar] = useState(3300000)
    const [isEditCarprice, setIsinputEditCarprice] = useState(false)
    const [textEditCarprice, setTextEditCarprice] = useState(5000000)
    const [focusCarCost, setFocusCarCost] = useState(false)

    const inputRangeInitialFee = useRef<HTMLInputElement>(null)
    const inputTextInitialFee = useRef<HTMLInputElement>(null)
    const inputRageProgressInitialFee = useRef<HTMLInputElement>(null)
    const [percentageCar, setPercentageCar] = useState(30)
    const [focusInitialFee, setFocusInitialFee] = useState(false)

    const inputRangeMonth = useRef<HTMLInputElement>(null)
    const inputTextMounth = useRef<HTMLInputElement>(null)
    const inputRageProgressMounth = useRef<HTMLInputElement>(null)
    const [mounthCount, setMounthCount] = useState(20)
    const [focusMounth, setFocusMounth] = useState(false)


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

    const inputRangeCarCost = () => {
        const inputRangeValue = +inputRangeCar.current!.value
        setDefaultSumCar(prev => prev = inputRangeValue)

        setIsinputEditCarprice(prev => prev = false)
        setFocusCarCost(prev => prev = false)

        inputRageProgressCarPrice.current!.style.width = `${percentInputRage}%`
    }

    const inputRangeInitialFeeFuck = () => {
        const inputRangeValueInitialFee = +inputRangeInitialFee.current!.value
        setPercentageCar(prev => prev = inputRangeValueInitialFee)
        setFocusInitialFee(prev => prev = false)

        inputTextInitialFee.current!.value = initialFee.toLocaleString()
        inputRageProgressInitialFee.current!.style.width = `${percentInputRageInitialFee}%`
    }

    const inputRangeMounth = () => {
        const inputRangeValue = +inputRangeMonth.current!.value
        setMounthCount(prev => prev = inputRangeValue)
        setFocusMounth(prev => prev = false)

        inputTextMounth.current!.value = `${inputRangeValue}`
        inputRageProgressMounth.current!.style.width = `${percentInputRageMounth}%`
    }

    const inputEditCarCost = () => setIsinputEditCarprice(prev => prev = true)

    const inputChangeCarCost = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.length > 7) event.target.value = event.target.value.slice(0, 7);

        const valueTarget = +event.target.value
        setTextEditCarprice(prev => prev = valueTarget)

        if (valueTarget >= 1000000 && valueTarget <= 6000000) {
            setFocusCarCost(prev => prev = false)
            setDefaultSumCar(prev => prev = valueTarget)
            setIsinputEditCarprice(prev => prev = false)
        }
    }

    const inputChangePercentCarCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 2) event.target.value = event.target.value.slice(0, 2);
        const valueTarget = +event.target.value

        if (valueTarget >= 10 && valueTarget <= 60) setPercentageCar(prev => prev = valueTarget)
    }

    const inputChangeMounthCarCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 2) event.target.value = event.target.value.slice(0, 2);
        const valueTarget = +event.target.value

        if (valueTarget >= 1 && valueTarget <= 60) setMounthCount(prev => prev = valueTarget)
    }

    const inputFocusCarCost = () => setFocusCarCost(prev => prev = true)
    const inputBlurCarCost = () => setFocusCarCost(prev => prev = false)

    const inputFocusCInitialFee = () => setFocusInitialFee(prev => prev = true)
    const inputBlurCInitialFee = () => setFocusInitialFee(prev => prev = false)

    const inputFocusMounth = () => setFocusMounth(prev => prev = true)
    const inputBlurMounth = () => setFocusMounth(prev => prev = false)

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = {
            car_coast: defaultSumCar,
            initail_payment: initialFee,
            initail_payment_percent: percentageCar,
            lease_term: mounthCount,
            total_sum: Math.floor(amountLeaseAgreement),
            monthly_payment_from: Math.floor(monthPay),
        }

        setSendData(prev => prev = true)
        axios.post(`${BACKEND_HOST}`, formData).then(response => console.log(response))
    }

    const closeMessageSendData = () => setSendData(prev => prev = false)

    if (sendData) setTimeout(closeMessageSendData, 4000)

    return (
        <form className={style.formCalculatingCarLease} action="" onSubmit={submitHandler}>
            <h1 className={style.formCalculatingCarLease__title}>
                Рассчитайте стоимость автомобиля в лизинг
            </h1>
            <ul className={style.formCalculatingCarLease__list}>
                <li className={style.formCalculatingCarLease__item}>
                    <h3 className={style.formCalculatingCarLease__headline}>Стоимость автомобиля</h3>
                    <div className={focusCarCost ?
                        style.formCalculatingCarLease__wrapperInput + ' ' + style.formCalculatingCarLease__focus :
                        style.formCalculatingCarLease__wrapperInput
                    }>
                        {isEditCarprice ?
                            <input
                                ref={inputTextProceAvto}
                                type="number"
                                className={textEditCarprice < 1000000 || textEditCarprice > 6000000 ?
                                    style.formCalculatingCarLease__inputText + ' ' + style.warning :
                                    style.formCalculatingCarLease__inputText
                                }
                                onChange={inputChangeCarCost}
                                onFocus={() => inputFocusCarCost()}
                                onBlur={() => inputBlurCarCost()}
                                placeholder='Введите цену от 1000 000 до 6000 000 руб.'
                            /> :
                            <div
                                className={style.formCalculatingCarLease__inputTextEdit}
                                onClick={() => inputEditCarCost()}
                            >
                                {defaultSumCar.toLocaleString()}
                                <span className={style.formCalculatingCarLease__percentSymbol}>₽</span>
                            </div>
                        }
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeCar} onInput={(() => inputRangeCarCost())}
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
                    <div className={focusInitialFee ?
                        style.formCalculatingCarLease__wrapperInput + ' ' + style.formCalculatingCarLease__focus :
                        style.formCalculatingCarLease__wrapperInput
                    }>
                        <input
                            type="text"
                            ref={inputTextInitialFee}
                            name='initail_payment'
                            className={style.formCalculatingCarLease__inputText}
                            readOnly
                            value={`${initialFee.toLocaleString()} ₽`} />
                        <div className={focusInitialFee ?
                            style.formCalculatingCarLease__inputPercentWrapper + ' ' + style.formCalculatingCarLease__focus :
                            style.formCalculatingCarLease__inputPercentWrapper
                        }>
                            <input
                                type='number'
                                name='initail_payment_percent'
                                className={style.formCalculatingCarLease__interestRate}
                                onChange={inputChangePercentCarCost}
                                onFocus={() => inputFocusCInitialFee()}
                                onBlur={() => inputBlurCInitialFee()}
                                value={percentageCar}
                            />
                            <span className={style.formCalculatingCarLease__percent}>%</span>
                        </div>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeInitialFee} onInput={(() => inputRangeInitialFeeFuck())}
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
                    <div className={focusMounth ?
                        style.formCalculatingCarLease__wrapperInput + ' ' + style.formCalculatingCarLease__focus :
                        style.formCalculatingCarLease__wrapperInput}
                    >
                        <input
                            type="number"
                            name='lease_term'
                            ref={inputTextMounth}
                            className={style.formCalculatingCarLease__inputText}
                            onChange={inputChangeMounthCarCost}
                            onFocus={() => inputFocusMounth()}
                            onBlur={() => inputBlurMounth()}
                            value={mounthCount}
                        />
                        <span className={style.formCalculatingCarLease__month}>мес.</span>
                        <div className={style.formCalculatingCarLease__inputRangeWrapper}>
                            <input ref={inputRangeMonth} onInput={(() => inputRangeMounth())}
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
                    <div className={style.calculationAmount__summa}>{Math.floor(amountLeaseAgreement).toLocaleString()} <span className={style.calculationAmount__summa_percenr_symbol}>₽</span></div>
                </div>
                <div className={style.calculationAmount__item}>
                    <h3 className={style.calculationAmount__title}>Ежемесячный платеж от</h3>
                    <div className={style.calculationAmount__summa}>{Math.floor(monthPay).toLocaleString()} <span className={style.calculationAmount__summa_percenr_symbol}>₽</span></div>
                </div>
                <button className={style.calculationAmount__submit}>Оставить заявку</button>
            </div>

            {sendData && <div className={style.formCalculatingCarLease__sendData}>
                <span className={style.formCalculatingCarLease__messageSendData}>
                    Спасибо, Ваша заявка отправлена!
                </span>
            </div>}
        </form>
    )
}