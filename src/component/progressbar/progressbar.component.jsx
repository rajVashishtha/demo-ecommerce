import './progressbar.style.scss';
import {ProgressBar} from 'react-bootstrap';
import {Grid} from '@material-ui/core'

const CustomProgressBar = ({progress})=>{
    return(
        <div className="for-progress-bar">
            <ProgressBar striped now={progress} />
            <Grid container style={{width:"100%"}}>
                <Grid item xs justify="center" style={{textAlign:"center"}}>
                    Fill Details
                </Grid>
                <Grid item xs justify="center" style={{textAlign:"center"}}>
                    Verify 
                </Grid>
                <Grid item xs justify="center" style={{textAlign:"center"}}>
                    Payment 
                </Grid>
            </Grid>
        </div>
    )
}
export default CustomProgressBar;