import React from 'react';
import './camera.style.scss';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class CustomCamera extends React.Component{
    render(){
        const {onClick,name} = this.props;
        return(
            <div style={{
                width:"20px !important",
                height:"20px !important"
            }}>
                <Camera onTakePhoto = {(dataUri) => {onClick(dataUri, name);}}/>
            </div>
        )
    }
}

export default CustomCamera;
