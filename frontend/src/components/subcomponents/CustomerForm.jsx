import DropDown from "./DropDown"
import validator from 'validator'

export default function CustomerForm(
    {formType, register, errors, setValue, 
        firstname, lastname, address, addressTwo, 
        city, province, postalCode, country, phone, email}) {
        
    return <div className={formType ? "shipping-form" : "billing-form"}>
                <div className = "cinfo-double">
                    <div className={`cinfo ${errors.firstname? 'error' : '' }`}>
                        <input 
                            id={formType ? "cinfo-fname" : "binfo-fname"}
                            type="text"
                            className="cinfo-input"
                            { ...register( formType ? "firstname" : "bfirstname", { required: "First name required" })}                     
                            />
                        <label 
                            htmlFor="cinfo-fname" 
                            className={`cinfo-label ${firstname.length? 'active' : ''}`}>
                            {errors.firstname? errors.firstname.message :'First Name'}
                        </label>
                    </div>
                    <div className={`cinfo ${errors.lastname? 'error' : '' }`}>
                        <input 
                            id={formType ? "cinfo-lname" : "binfo-lname"}
                            className="cinfo-input" 
                            type="text"
                            { ...register( formType ? "lastname" : "blastname", { required: "Last name required" })}                     
                            />
                        <label 
                            htmlFor="cinfo-lname" 
                            className={`cinfo-label ${lastname.length? 'active' : ''}`}>
                            {errors.lastname? errors.lastname.message :'Last Name'}
                        </label>
                    </div>
                </div>
                <div className={`cinfo ${errors.address? 'error' : '' }`}>
                    <input 
                        id={formType ? "cinfo-address" : "binfo-address"}
                        className="cinfo-input" 
                        type="text"
                        { ...register( formType ? "address" : "baddress" , { required: "Address required" })}                     
                    />
                    <label 
                        htmlFor="cinfo-address" 
                        className={`cinfo-label ${address.length? 'active' : ''}`}>
                    {errors.address? errors.address.message :'Address'}
                    </label>
                </div>
                <div className={`cinfo ${errors.addressTwo? 'error' : '' }`}>
                    <input 
                        id={formType ? "cinfo-address-2" : "binfo-address-2"}
                        className="cinfo-input" 
                        type="text"
                        { ...register(formType ? "addressTwo" : "baddressTwo", { required: false })}                     
                    />
                    <label 
                    htmlFor="cinfo-address-2" 
                    className={`cinfo-label ${addressTwo.length? 'active' : ''}`}>
                    {errors.addressTwo? errors.addressTwo.message :'Address 2'}
                    </label>
                </div>
                <div className="cinfo-double">
                    <div className={`cinfo ${errors.city? 'error' : '' }`}>
                        <input 
                            id={formType ? "cinfo-city" : "binfo-city"}
                            className="cinfo-input" 
                            type="text"
                            { ...register(formType ? "city" : "bcity", { required: "City required"})}                     
                        />
                        <label 
                            htmlFor="cinfo-city" 
                            className={`cinfo-label ${city.length? 'active' : ''}`}>
                        {errors.city? errors.city.message :'City'}
                        </label>
                    </div>
                    <div className={`cinfo ${errors.province? 'error' : '' }`}>
                        <DropDown which={formType ? 'province' : 'bprovince'} {...{register, country}}/>
                        <label 
                            htmlFor="cinfo-province" 
                            className={`cinfo-label ${province.length? 'active' : ''}`}>
                        {errors.province? errors.province.message :'Province/State'}
                        </label>
                    </div>
                </div>
                <div className="cinfo-double">
                    <div className={`cinfo ${errors.postalCode? 'error' : '' }`}>
                        <input 
                            id={formType ? "cinfo-postal-code" : "binfo-postal-code"}
                            className="cinfo-input"
                            onBlur={() => 
                                setValue('postalCode', 
                                country==="CA" ? 
                                    postalCode.charAt(3)!==' ' ? 
                                        `${postalCode.slice(0,3)} ${postalCode.slice(3, )}` : 
                                    postalCode: 
                                postalCode)
                            }             
                            { ...register(formType ? "postalCode" : "bpostalCode", 
                            { 
                                required: "Postal code required", 
                                validate: (v) => validator.isPostalCode(v, country) || "Invalid postal code"
                            })}
                        />
                        <label 
                            htmlFor="cinfo-postal-code" 
                            className={`cinfo-label ${postalCode.length? 'active' : ''}`}>
                        {errors.postalCode? errors.postalCode.message :'Postal/Zip Code'}
                        </label>
                    </div>
                    <div className={`cinfo ${errors.country? 'error' : '' }`}>
                        <DropDown 
                            which={formType ? 'country' : 'bcountry'} 
                            register={register} 
                            setValue={setValue}
                        />
                        <label 
                            htmlFor="cinfo-country" 
                            className={`cinfo-label ${country.length? 'active' : ''}`}>
                        {errors.country? errors.country.message :'Country'}
                        </label>
                    </div>
                </div>
                <div className={`cinfo ${errors.phone? 'error' : '' }`}>
                    <input 
                        id={formType ? "cinfo-phone" : "binfo-phone"} 
                        className="cinfo-input"
                        onKeyDown={e => {
                            if (/^[a-zA-Z!@#$%^&*\(\)\=\~\`\?\/\<\>\,\.\_\'\"\;\:{\}\[\]\\\|]$/.test(e.key)) 
                                e.preventDefault()
                            }
                        }
                        { ...register(formType ? "phone" : "bphone", 
                        { 
                            required: "Phone number required",
                            validate: (v) => validator.isMobilePhone(v) || "Invalid phone number"
                        })}           
                    />
                    <label 
                        htmlFor="cinfo-phone" 
                        className={`cinfo-label ${phone.length? 'active' : ''}`}>
                    {errors.phone? errors.phone.message :'Phone'}
                    </label>
                </div>
                <div className={`cinfo ${errors.email? 'error' : '' }`}>
                    <input 
                        id={formType ? "cinfo-email" : "binfo-email"} 
                        className="cinfo-input"
                        { ...register(formType ? "email" : "bemail", 
                            {
                                required: "Email required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            }
                        )}                     
                    />
                    <label 
                        htmlFor="cinfo-email" 
                        className={`cinfo-label ${email.length? 'active' : ''}`}>
                    {errors.email? errors.email.message :'Email'}
                    </label>
                </div>
            </div>
}