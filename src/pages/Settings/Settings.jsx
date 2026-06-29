import { useEffect, useState } from "react";

import {

    getSettings,

    updateSettings,

    resetSettings

} from "../../services/settingService";

import "./Settings.css";

function Settings() {

    const token =

        localStorage.getItem("token");

    const [loading, setLoading] =

        useState(false);

    const [formData, setFormData] =

        useState({

            shopName: "",

            ownerName: "",

            gstNumber: "",

            phone: "",

            alternatePhone: "",

            email: "",

            website: "",

            address: "",

            city: "",

            state: "",

            country: "India",

            pincode: "",

            invoicePrefix: "INV",

            currency: "₹",

            defaultGST: 18,

            invoiceFooter: "",

            termsAndConditions: "",

            bankName: "",

            accountHolderName: "",

            accountNumber: "",

            ifscCode: "",

            branchName: "",

            upiId: "",

            timezone: "Asia/Kolkata",

            dateFormat: "DD/MM/YYYY",

            timeFormat: "24 Hours",

            language: "English",

            financialYearStart: "01-04",

            lowStockAlert: 5,

            maintenanceMode: false

        });

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const res =

                await getSettings(token);

            setFormData(res.settings);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        const {

            name,

            value,

            type,

            checked

        } = e.target;

        setFormData({

            ...formData,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        });

    };

    const handleSubmit =

        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await updateSettings(

                    formData,

                    token

                );

                alert(

                    "Settings Updated Successfully"

                );

            }

            catch (err) {

                alert(

                    err.response?.data?.message ||

                    "Update Failed"

                );

            }

            finally {

                setLoading(false);

            }

        };

    const handleReset =

        async () => {

            if (

                !window.confirm(

                    "Reset all settings?"

                )

            )

                return;

            try {

                await resetSettings(token);

                loadSettings();

            }

            catch (err) {

                console.log(err);

            }

        };

    return (

        <div className="settings-page">

            <h1>

                Company Settings

            </h1>

            <form

                className="settings-form"

                onSubmit={handleSubmit}

            >

                <div className="settings-card">

                    <h2>

                        Business Information

                    </h2>

                    <div className="settings-grid">

                        <div className="form-group">

                            <label>

                                Shop Name

                            </label>

                            <input

                                type="text"

                                name="shopName"

                                value={formData.shopName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Owner Name

                            </label>

                            <input

                                type="text"

                                name="ownerName"

                                value={formData.ownerName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                GST Number

                            </label>

                            <input

                                type="text"

                                name="gstNumber"

                                value={formData.gstNumber}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Phone

                            </label>

                            <input

                                type="text"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Alternate Phone

                            </label>

                            <input

                                type="text"

                                name="alternatePhone"

                                value={formData.alternatePhone}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Email

                            </label>

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Website

                            </label>

                            <input

                                type="text"

                                name="website"

                                value={formData.website}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>
                                {/* ====================================== */}
                {/* ADDRESS */}
                {/* ====================================== */}

                <div className="settings-card">

                    <h2>

                        Address Information

                    </h2>

                    <div className="settings-grid">

                        <div className="form-group full-width">

                            <label>

                                Address

                            </label>

                            <textarea

                                name="address"

                                rows="3"

                                value={formData.address}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                City

                            </label>

                            <input

                                type="text"

                                name="city"

                                value={formData.city}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                State

                            </label>

                            <input

                                type="text"

                                name="state"

                                value={formData.state}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Country

                            </label>

                            <input

                                type="text"

                                name="country"

                                value={formData.country}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Pincode

                            </label>

                            <input

                                type="text"

                                name="pincode"

                                value={formData.pincode}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>

                {/* ====================================== */}
                {/* INVOICE SETTINGS */}
                {/* ====================================== */}

                <div className="settings-card">

                    <h2>

                        Invoice Settings

                    </h2>

                    <div className="settings-grid">

                        <div className="form-group">

                            <label>

                                Invoice Prefix

                            </label>

                            <input

                                type="text"

                                name="invoicePrefix"

                                value={formData.invoicePrefix}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Currency

                            </label>

                            <input

                                type="text"

                                name="currency"

                                value={formData.currency}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Default GST %

                            </label>

                            <input

                                type="number"

                                name="defaultGST"

                                value={formData.defaultGST}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group full-width">

                            <label>

                                Invoice Footer

                            </label>

                            <textarea

                                rows="3"

                                name="invoiceFooter"

                                value={formData.invoiceFooter}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group full-width">

                            <label>

                                Terms & Conditions

                            </label>

                            <textarea

                                rows="4"

                                name="termsAndConditions"

                                value={formData.termsAndConditions}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>

                {/* ====================================== */}
                {/* BANK DETAILS */}
                {/* ====================================== */}

                <div className="settings-card">

                    <h2>

                        Bank Details

                    </h2>

                    <div className="settings-grid">

                        <div className="form-group">

                            <label>

                                Bank Name

                            </label>

                            <input

                                type="text"

                                name="bankName"

                                value={formData.bankName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Account Holder

                            </label>

                            <input

                                type="text"

                                name="accountHolderName"

                                value={formData.accountHolderName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Account Number

                            </label>

                            <input

                                type="text"

                                name="accountNumber"

                                value={formData.accountNumber}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                IFSC Code

                            </label>

                            <input

                                type="text"

                                name="ifscCode"

                                value={formData.ifscCode}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Branch Name

                            </label>

                            <input

                                type="text"

                                name="branchName"

                                value={formData.branchName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                UPI ID

                            </label>

                            <input

                                type="text"

                                name="upiId"

                                value={formData.upiId}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>
                                {/* ====================================== */}
                {/* SYSTEM SETTINGS */}
                {/* ====================================== */}

                <div className="settings-card">

                    <h2>

                        System Settings

                    </h2>

                    <div className="settings-grid">

                        <div className="form-group">

                            <label>

                                Time Zone

                            </label>

                            <select

                                name="timezone"

                                value={formData.timezone}

                                onChange={handleChange}

                            >

                                <option value="Asia/Kolkata">

                                    Asia/Kolkata

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Date Format

                            </label>

                            <select

                                name="dateFormat"

                                value={formData.dateFormat}

                                onChange={handleChange}

                            >

                                <option>

                                    DD/MM/YYYY

                                </option>

                                <option>

                                    MM/DD/YYYY

                                </option>

                                <option>

                                    YYYY-MM-DD

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Time Format

                            </label>

                            <select

                                name="timeFormat"

                                value={formData.timeFormat}

                                onChange={handleChange}

                            >

                                <option>

                                    24 Hours

                                </option>

                                <option>

                                    12 Hours

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Language

                            </label>

                            <select

                                name="language"

                                value={formData.language}

                                onChange={handleChange}

                            >

                                <option>

                                    English

                                </option>

                                <option>

                                    Hindi

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Financial Year Start

                            </label>

                            <input

                                type="text"

                                name="financialYearStart"

                                value={formData.financialYearStart}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Low Stock Alert

                            </label>

                            <input

                                type="number"

                                name="lowStockAlert"

                                value={formData.lowStockAlert}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group full-width checkbox-group">

                            <label>

                                <input

                                    type="checkbox"

                                    name="maintenanceMode"

                                    checked={formData.maintenanceMode}

                                    onChange={handleChange}

                                />

                                Enable Maintenance Mode

                            </label>

                        </div>

                    </div>

                </div>

                {/* ====================================== */}
                {/* ACTION BUTTONS */}
                {/* ====================================== */}

                <div className="settings-actions">

                    <button

                        type="submit"

                        className="save-btn"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Saving..."

                                : "💾 Save Settings"

                        }

                    </button>

                    <button

                        type="button"

                        className="reset-btn"

                        onClick={handleReset}

                    >

                        🔄 Reset Settings

                    </button>

                </div>

            </form>

        </div>

    );

}

export default Settings;