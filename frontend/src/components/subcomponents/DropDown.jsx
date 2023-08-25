const states = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' },
    { name: 'Colorado', code: 'CO' },
    { name: 'Connecticut', code: 'CT' },
    { name: 'Delaware', code: 'DE' },
    { name: 'District of Columbia', code: 'DC'},
    { name: 'Florida', code: 'FL' },
    { name: 'Georgia', code: 'GA' },
    { name: 'Hawaii', code: 'HI' },
    { name: 'Idaho', code: 'ID' },
    { name: 'Illinois', code: 'IL' },
    { name: 'Indiana', code: 'IN' },
    { name: 'Iowa', code: 'IA' },
    { name: 'Kansas', code: 'KS' },
    { name: 'Kentucky', code: 'KY' },
    { name: 'Louisiana', code: 'LA' },
    { name: 'Maine', code: 'ME' },
    { name: 'Maryland', code: 'MD' },
    { name: 'Massachusetts', code: 'MA' },
    { name: 'Michigan', code: 'MI' },
    { name: 'Minnesota', code: 'MN' },
    { name: 'Mississippi', code: 'MS' },
    { name: 'Missouri', code: 'MO' },
    { name: 'Montana', code: 'MT' },
    { name: 'Nebraska', code: 'NE' },
    { name: 'Nevada', code: 'NV' },
    { name: 'New Hampshire', code: 'NH' },
    { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' },
    { name: 'New York', code: 'NY' },
    { name: 'North Carolina', code: 'NC' },
    { name: 'North Dakota', code: 'ND' },
    { name: 'Ohio', code: 'OH' },
    { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' },
    { name: 'Pennsylvania', code: 'PA' },
    { name: 'Rhode Island', code: 'RI' },
    { name: 'South Carolina', code: 'SC' },
    { name: 'South Dakota', code: 'SD' },
    { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' },
    { name: 'Utah', code: 'UT' },
    { name: 'Vermont', code: 'VT' },
    { name: 'Virginia', code: 'VA' },
    { name: 'Washington', code: 'WA' },
    { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' },
    { name: 'Wyoming', code: 'WY' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'Guam', code: 'GU' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Virgin Islands', code: 'VI' },
]

const provinces = [ 
    { name: 'Alberta', code: 'AB' }, 
    { name: 'British Columbia', code: 'BC' }, 
    { name: 'Manitoba', code: 'MB' }, 
    { name: 'New Brunswick', code: 'NB' }, 
    { name: 'Newfoundland and Labrador', code: 'NL' }, 
    { name: 'Northwest Territories', code: 'NT' }, 
    { name: 'Nova Scotia', code: 'NS' }, 
    { name: 'Nunavut', code: 'NU' }, 
    { name: 'Ontario', code: 'ON' }, 
    { name: 'Prince Edward Island', code: 'PE' }, 
    { name: 'Quebec', code: 'QC' }, 
    { name: 'Saskatchewan', code: 'SK' }, 
    { name: 'Yukon Territory', code: 'YT' } 
]

export default function DropDown({which, register, country, setValue}){

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