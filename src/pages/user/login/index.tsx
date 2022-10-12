import LoginForm from '@/pages/user/login/componetns/LoginForm';
import loginImg from '@/assets/user/login_img.png';
import styles from './index.less';

const Login = () => {
  const handleLoginSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.login}>
      <div className={styles.main}>
        <div className={styles.imgBox}>
          <img src={loginImg} alt="logo" className={styles.img} />
        </div>
        <div className={styles.loginBox}>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Login;
