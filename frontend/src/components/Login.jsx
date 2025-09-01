
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/src/css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '/src/common/AuthContext'

const Login = () => {
  const nav = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [username, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated)
      nav('/');
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setMessage('아이디를 입력해주세요.');
      return;
    }

    if (!password) {
      setMessage('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await login(username, password);
      if (response.status === 200) {
        nav(-1, { replace: true });
      } else {
        setMessage('아이디 비밀번호를 확인해 주세요');
        setUserEmail('');
        setPassword('');
        e.target.reset();
      }
    } catch (error) {
      setMessage('아이디 비밀번호를 확인해 주세요');
      setUserEmail('');
      setPassword('');
      e.target.reset();
    }
  };

  const findInfo = (url, title) => {
    // e.preventDefault();
    // const width = 650; // 팝업 창의 너비
    // const height = 700; // 팝업 창의 높이
    // const left = (window.screen.width / 2) - (width / 2); // 화면 중앙에 위치하도록 수평 위치 계산
    // const top = (window.screen.height / 2) - (height / 2); // 화면 중앙에 위치하도록 수직 위치 계산

    // const specs = `width=${width},height=${height},top=${top},left=${left}`;
    // window.open(url, title, specs);
  }


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='LoginMainWrap'>
      <div className="LoginMain">
        <div className="logo-container">
          <img src="/images/main-logo.png"></img>
        </div>
        <form className="login-form">
          <div className="LoginMainInput-group">
            <label htmlFor="username" style={{ width: "40px" }}>
              <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "20px" }} />
            </label>
            <input type="text" className="login-username" id='username' value={username} onChange={(e) => setUserEmail(e.target.value)} placeholder="아이디" />
          </div>
          <div className="LoginMainInput-group">
            <label htmlFor="password" style={{ width: "40px" }}>
              <FontAwesomeIcon icon={faKey} style={{ fontSize: "20px" }} />
            </label>
            <input type={showPassword ? "text" : "password"} className='login-password' id="password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" autoComplete="off" />
            <span className="password-toggle" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ fontSize: "18px", cursor: "pointer" }} />
            </span>
          </div>
          <div className='LoginMainCheckMessageArea'>
            <span className='LoginMainCheckMessage'>{message}</span>
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>로그인</button>
        </form>
        <div className="help-links">
          <a href="#" onClick={() => findInfo('/findbyid', '아이디 찾기')}>아이디 찾기</a> | <a href="#" onClick={() => findInfo('/findbypw', '비밀번호 찾기')}>비밀번호 찾기</a> | <Link to='/join'>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;