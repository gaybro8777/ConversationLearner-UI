import * as React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { CommandButton, Dialog, DialogFooter, DialogType, ChoiceGroup, TextField, DefaultButton, Dropdown } from 'office-ui-fabric-react';
import { setUser } from '../actions/updateActions'
import { fetchAllActions, fetchAllEntities, fetchAllTrainDialogs } from '../actions/fetchActions';
import { setLoginDisplay } from '../actions/updateActions'
import { BlisAppBase, BlisAppMetaData } from 'blis-models'
import { developmentSubKeyLUIS } from '../secrets'
import { State } from '../types'
type CultureObject = {
    CultureCode: string;
    CultureName: string;
}
class UserLogin extends React.Component<any, any> {
    constructor(p: any) {
        super(p);
        this.state = {
            userName: '',
            userPassword: ''
        }
    }
    handleClose() {
        this.props.setLoginDisplay(false);
        this.setState({
            userName: '',
            userPassword: ''
        })
    }
    nameChanged(text: string) {
        this.setState({
            userName: text
        })
    }
    passwordChanged(text: string) {
        this.setState({
            userPassword: text
        })
    }
    generateUserId(name : string, password : string) {
        if (!name || !password) {
            return;
        }
        return name + "_" + password
    }
    createUser() {
        let userId = this.generateUserId(this.state.userName, this.state.userPassword);
        this.props.setUser(this.state.userName, this.state.userPassword, userId);
        this.handleClose();
    }
    logout() {
        this.props.setUser(null, null, null);
    }
    render() {
        let isBlocking, title, input, button = null;
        if (this.props.user.id == null) 
        {
            isBlocking = true;
            title = "Log In";
            input =
                    <div>
                        <TextField onChanged={this.nameChanged.bind(this)} label="Name" placeholder="User Name..." value={this.state.userName} />
                        <TextField onChanged={this.passwordChanged.bind(this)} label="Password" placeholder="Password..." value={this.state.userPassword} />
                    </div>;
            button =
                <CommandButton
                            data-automation-id='randomID2'
                            disabled={false}
                            onClick={this.createUser.bind(this)}  
                            className='goldButton'
                            ariaDescription='Log In'
                            text='Log In'
                        />
        }
        else
        {
            isBlocking = false;
            title = "Log Out";
            button =
                <div>
                <CommandButton
                            data-automation-id='randomID2'
                            disabled={false}
                            onClick={this.logout.bind(this)}  
                            className='goldButton'
                            ariaDescription='Log Out'
                            text='Log Out'
                        />
                <CommandButton
                            data-automation-id='randomID3'
                            className="grayButton"
                            disabled={false}
                            onClick={this.handleClose.bind(this)}
                            ariaDescription='Cancel'
                            text='Cancel'
                        />
                </div>
        }
        return (
            <div>
                <Modal
                    isOpen={this.props.displayLogin}
                    onDismiss={this.handleClose.bind(this)}
                    isBlocking={isBlocking}
                    containerClassName='createModal'
                >
                    <div className='modalHeader'>
                        <span className='ms-font-xxl ms-fontWeight-semilight'>{title}</span>
                    </div>
                    {input}
                    <div className='modalFooter'>
                        {button}
                    </div>
                </Modal>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setUser: setUser,
        setLoginDisplay: setLoginDisplay
    }, dispatch);
}
const mapStateToProps = (state: State) => {
    return {
        user: state.user,
        displayLogin: state.display.displayLogin
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);