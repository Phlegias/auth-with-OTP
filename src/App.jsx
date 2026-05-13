import React, { useEffect, useState } from "react";
import "./App.css"

const App = () => {
	const [otp, setOtp] = useState("");
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(10);

	const [showOTP, setShowOTP] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");

	const [incorrectPhoneNumber, setIncorrectPhoneNumber] = useState(false);
	const [incorrectOTP, setIncorrectOTP] = useState(false);

	const [otpCooldown, setOtpCooldown] = useState(true);
 
	//validation
	const handlePhoneChange = (e) => {
		const val = e.target.value;
		const onlyNums = val.replace(/\D/g, '');
		setPhoneNumber(onlyNums.slice(0, 11));
	};

	const handleOTP = (e) => {
		const val = e.target.value;
		const onlyNums = val.replace(/\D/g, '');
		setOtp(onlyNums);
	};


	// send OTP on current number after button "Продолжить"
	const sendOtpMessage = () => {
		if (phoneNumber.length === 11) {
			setShowOTP(true);
			setIncorrectPhoneNumber(false);
			//sendFunc(); post /api/auth/otp
		} else
			setIncorrectPhoneNumber(true);
	};

	// function to resend OTP 
	const resendOTP = () => {
		//sendFunc(); post /api/auth/otp
		setOtpCooldown(true);
		setMinutes(0);
		setSeconds(10);
	};

	const check = () => {
		if (otp.length === 6) {
			setIncorrectOTP(false);
			//enterFunc(); /api/users/signin
		} else 
			setIncorrectOTP(true);
		
	}

	// decrease timer in OTP cooldown
	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) setSeconds(seconds - 1);
			if (seconds === 0){
				if (minutes === 0) {
					setOtpCooldown(false);
					clearInterval(interval);
				} else {
					setSeconds(59);
					setMinutes(minutes - 1);
				}
			} 
		}, 1000)
		return () => {
			clearInterval(interval);
		};
	}, [seconds]);


	return (
		<div className="container">
			<h2>Вход</h2>
			<p>
				Введите номер телефона для входа <br/>
				в личный кабинет
			</p>
			<div className="numberField">
				<input
					type="tel"
					placeholder="Телефон"
					value={phoneNumber}
					onChange={handlePhoneChange}
				/>
				{incorrectPhoneNumber ? <span>	Неверно указан номер телефона</span> : <></>}
			</div>
			
			
			{showOTP ? 
				(<>
					<div className="OtpField">
						<input
							type="number"
							placeholder="Проверочный код"
							value={otp}
							maxLength={6}
							onChange={handleOTP}
						/>
						{incorrectOTP ? <span>	Неверно указан код</span> : <></>}
					</div>
					
					{/*сюда дописать API*/}
					

					<div className="signin">
						<button
							onClick={check}
						>
							Войти
						</button>
					</div>

					<div className="resend-OTP">
						{otpCooldown ? 
							<p> Запросить код повторно можно через {" "}
								{minutes < 10 ? `0${minutes}` : minutes}:
								{seconds < 10 ? `0${seconds}` : seconds}						
							</p> :

							<button
								disabled={seconds > 0 || minutes > 0}
								onClick={resendOTP} 
							>
								Запросить код еще раз
							</button>
						}
						

						
					</div>
					
				</>) :
				(<div className="auth">
					<button
						onClick={sendOtpMessage}
					>
						Продолжить
					</button>
				</div>)
			}
		</div>
	)
}

export default App;