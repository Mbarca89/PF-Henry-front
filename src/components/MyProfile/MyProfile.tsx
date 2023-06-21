import styles from './MyProfile.module.css'
import { CgProfile } from 'react-icons/cg'

const MyProfile = () => {

    const user = {
        id: "6491c116b90b2ebad884db12",
        name: "Mauricio Barca",
        email: "mauriciobarca1989@gmail.com",
        address: "direccion del usuario",
        city: "San Luis",
        province: "San Luis",
        postalCode: 5700,
    }

    return (
        <div className={styles.myProfile}>
            <div className={styles.mainInfo}>
                <div>
                    <CgProfile size={50} />
                </div>
                <div className={styles.userInfo}>
                    <h2>{user.name}</h2>
                    <h5>{user.email}</h5>
                </div>
            </div>
            <div className={styles.accountInfo}>
                <h3>Datos de la cuenta:</h3>
                <div>
                    <h4>Nombre:</h4>
                    <h5>{user.name}</h5>
                </div>
                <div>
                    <h4>Email:</h4>
                    <h5>{user.email}</h5>
                </div><div>
                    <h4>Direccion:</h4>
                    <h5>{user.address}</h5>
                </div><div>
                    <h4>Ciudad:</h4>
                    <h5>{user.city}</h5>
                </div><div>
                    <h4>Provincia:</h4>
                    <h5>{user.province}</h5>
                </div>
            </div>
            <div className={styles.seller}>
                <div className={styles.text}>
                    <h3>Queres ser vendedor?</h3>
                    <p>Unite a nuestra gran familia y ofrecé tus productos a una comunidad en pleno crecimiento.</p>
                </div>
                <button>Registrarme</button>
            </div>
        </div>
    )
}

export default MyProfile