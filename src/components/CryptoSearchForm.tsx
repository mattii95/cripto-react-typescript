import { useCryptoStore } from '../store';
import { currencies } from "../data";
import { ChangeEvent, FormEvent, useState } from 'react';
import { Pair } from '../types';
import ErrorMessage from './ErrorMessage';

export default function CryptoSearchForm() {

    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchCryptoData = useCryptoStore((state) => state.fetchCryptoData)

    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(pair).includes('')) {
            setError('Todos los campos son requeridos.')
            return
        }

        setError('')

        // Consultar la api
        fetchCryptoData(pair)
    }

    return (
        <form
         className="form"
         onSubmit={handleSubmit}
        >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda: </label>
                <select 
                    name="currency" 
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">Seleccione</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                            {currency.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="cryptocurrency">Criptomoneda: </label>
                <select 
                    name="cryptocurrency" 
                    id="cryptocurrency"
                    onChange={handleChange}
                    value={pair.cryptocurrency}
                >
                    <option value="">Seleccione</option>
                    {cryptocurrencies.map(crypto => (
                        <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
                            {crypto.CoinInfo.FullName}
                        </option>
                    ))}
                </select>
            </div>
            <input type="submit" value="Cotizar" />
        </form>
    )
}