import React, { useState } from 'react'
import './login.css'
import { useTranslation } from 'react-i18next';
// import firebase from "firebase/app";
import {authentication} from '../../firebase-config'
import {RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth";
import { Col, Form } from 'react-bootstrap';
const Login = () => {
    const {t} = useTranslation();
    const countryCode = "+965";
    const [yourName, setYourName] = useState('');
    const [yourCountry] = useState('الكويت');
    const [yourCity, setYourCity] = useState('');
    const [yourEmail, setYourEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [userID, setUserID] = useState("");
    const [OTP, setOTP] = useState(' ');
    const [validated, setValidated] = useState(false);
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    const requestOTP = (e) => {
        e.preventDefault()
        // generateRecaptcha();
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                'size': 'invisible',
                'callback': (response) => {
                        console.log(response);
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
                'expired-callback': (response) => {
                        console.log(response);
                        recaptchaVerifier.reset();
                // Reset reCAPTCHA?
                }
            },
            authentication
        );
        // let appVerifier = window.recaptchaVerifier;
        let fullNumber = countryCode+PhoneNumber;
        console.log(fullNumber);
        signInWithPhoneNumber(authentication , fullNumber , recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleValidate = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
    }
    const ValidateOtp = () => {
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
            // success
        }).catch((err) => {
            alert("Wrong code");
        })
    }
    return (
        <div className='login-container'>
            <div className='add-new-account-content'>
                <h4>Create new account</h4>
                <Form onSubmit={requestOTP} className="row">
                        <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                            <Form.Control
                                    required 
                                    type="text" 
                                    name="" 
                                    placeholder={t('name')}
                                    value={yourName}
                                    onChange={(e) => setYourName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                            <Form.Control 
                                    required
                                    type="text" 
                                    placeholder="" 
                                    value={yourCountry} 
                                    disabled
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                            <Form.Control 
                                    required
                                    type="text" 
                                    placeholder={t('city')}
                                    value={yourCity}
                                    onChange={(e) => setYourCity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                            <Form.Control 
                                    required
                                    type="email" 
                                    placeholder="zafaf@gmail.com"
                                    value={yourEmail}
                                    onChange={(e) => setYourEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                            <div className="form-phone-number">
                                    <div className='col-2'>
                                        <div className='defaultCountry-kw-code' id={document.documentElement.dir === 'rtl' ? "kw-inp-left" : "kw-inp-right"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="25px" viewBox="0 85.333 512 341.333"><path fill="#FFF" d="M0 85.337h512v341.326H0z"/><path fill="#6DA544" d="M0 85.337h512v113.775H0z"/><path fill="#D80027" d="M0 312.888h512v113.775H0z"/><path d="M166.957 312.889 0 426.663V85.337l166.957 113.774z"/></svg>
                                                <span>+965</span>
                                        </div>
                                    </div>
                                    <div className='col-10'>
                                        <div className='defaultCountry-kw-inp'>
                                                <Form.Control 
                                                    required
                                                    type={'tel'}
                                                    placeholder='8888  8888'
                                                    value={PhoneNumber} 
                                                    onChange={(e) => setPhoneNumber(e.target.value)}  
                                                    maxLength={8}
                                                    minLength={8}
                                                />
                                        </div>
                                        <div id="recaptcha-container"></div>
                                    </div>      
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                            <button className='add-new-account-btn' id="new-verify-phone-btn" type='submit'>
                                    <h3>Login</h3>
                            </button>
                        </Form.Group>
                </Form>
                <div id='recaptcha-container'></div>
            </div>
        </div>
    )
}

export default Login