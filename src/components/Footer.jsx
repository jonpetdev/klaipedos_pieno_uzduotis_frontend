import './Footer.css'
import {LiaPhoneVolumeSolid} from "react-icons/lia";

const Footer=()=>{

    return(
        <div className={"footer-container"}>
            <div className={"help-container"}>
                <LiaPhoneVolumeSolid />  Pagalba telefonu: +370 600 00000
            </div>
        </div>
    )
}
export default Footer;