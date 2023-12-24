import { states, provinces } from '../../utils/util'


export default function CheckoutDropDown({which, register, country, setValue}){

    const countryChanged = (which, countryCode) => {
        if (which === "country") {
            setValue("province", "")
            setValue("postalCode", "")
            setValue("country", countryCode)
        } else if (which === "bcountry") {
            setValue("bprovince", "")
            setValue("bpostalCode", "")
            setValue("bcountry", countryCode) 
        }
    }

    if (which === "country")
        return <select className="cinfo-input" id="cinfo-country" name="cinfo-country"
                    defaultValue={'CA'}
                    { ...register("country", { required: "Country required"})}
                    onChange={(e) => countryChanged(which, e.target.value)}
                    >
                    <option value="PLACEHOLDER" disabled>Select country</option>
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                </select>
    else if (which === "bcountry") {
        return <select className="cinfo-input" id="binfo-country" name="binfo-country"
            defaultValue={'CA'}
            { ...register("bcountry", { required: "Country required"})} 
            onChange={(e) => countryChanged(which, e.target.value)}
            >
            <option value="PLACEHOLDER" disabled>Select country</option>
            <option value="CA">Canada</option>
            <option value="US">United States</option>
        </select>
    }
    else if (which !== "country" && which !== "bcountry" && country === "CA") {
        return <select className="cinfo-input" 
                    id={ which === "province" ? "cinfo-province" : which === "bprovince" ? "binfo-province" : null } 
                    name={ which === "province" ? "cinfo-province" : which === "bprovince" ? "binfo-province" : null }
                    defaultValue={""}
                    { ...register( which === "province" ? "province" : which === "bprovince" ? "bprovince" : null,
                    { required: "Province required"})} >
                    <option value="" disabled></option>
                    {provinces.map(p => <option value={p.code} key={p.code}>{p.name}</option>)}
                </select>
    } else if (which !== "country" && which !== "bcountry" && country === "US") {
        return <select className="cinfo-input" 
                    id={ which === "province" ? "cinfo-province" : which === "bprovince" ? "binfo-province" : null } 
                    name={ which === "province" ? "cinfo-province" : which === "bprovince" ? "binfo-province" : null }
                    defaultValue={""}
                    { ...register( which === "province" ? "province" : which === "bprovince" ? "bprovince" : null,
                    { required: "State required"})} >
                <option value="" disabled></option>
                {states.map(s => <option value={s.code} key={s.code}>{s.name}</option>)}
                </select>
                
    } else {
        return <div>404</div>
    }
}