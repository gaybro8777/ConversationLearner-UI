export enum AT {
    // UPDATE
    EDIT_BLIS_APPLICATION_ASYNC = 'EDIT_BLIS_APPLICATION_ASYNC',
    EDIT_BLIS_APPLICATION_FULFILLED = 'EDIT_BLIS_APPLICATION_FULFILLED',
    EDIT_ENTITY_ASYNC = 'EDIT_ENTITY_ASYNC',
    EDIT_ENTITY_FULFILLED = 'EDIT_ENTITY_FULFILLED',
    EDIT_ACTION_ASYNC = 'EDIT_ACTION_ASYNC',
    EDIT_ACTION_FULFILLED = 'EDIT_ACTION_FULFILLED',
    EDIT_TRAIN_DIALOG = 'EDIT_TRAIN_DIALOG',
    EDIT_LOG_DIALOG = 'EDIT_LOG_DIALOG',

    // DISPLAY
    SET_CURRENT_BLIS_APP = 'SET_CURRENT_BLIS_APP',
    SET_CURRENT_BLIS_APP_FULFILLED = 'SET_CURRENT_BLIS_APP_FULFILLED',
    SET_CURRENT_TRAIN_DIALOG = 'SET_CURRENT_TRAIN_DIALOG',
    SET_CURRENT_LOG_DIALOG = 'SET_CURRENT_LOG_DIALOG',
    SET_CURRENT_CHAT_SESSION = 'SET_CURRENT_CHAT_SESSION',
    SET_CURRENT_TEACH_SESSION = 'SET_CURRENT_TEACH_SESSION',
    SET_DISPLAY_MODE = 'SET_DISPLAY_MODE',
    SET_LOGIN_DISPLAY = 'SET_LOGIN_DISPLAY',
    SET_ERROR_DISPLAY = 'SET_ERROR_DISPLAY',
    CLEAR_ERROR_DISPLAY = 'CLEAR_ERROR_DISPLAY',
    TOGGLE_TRAIN_DIALOG = 'TOGGLE_TRAIN_DIALOG',
    TOGGLE_LOG_DIALOG = 'TOGGLE_LOG_DIALOG',
    UPDATE_OPERATION_FULFILLED = 'UPDATE_OPERATION_FULFILLED',
    SET_USER = 'SET_USER',
    SET_USER_KEY = 'SET_USER_KEY',
    LOGOUT = 'LOGOUT',
    EMPTY_STATE_PROPERTIES = 'EMPTY_STATE_PROPERTIES',
    NO_OP = 'NO_OP',
    CHAT_MESSAGE_RECEIVED = 'CHAT_MESSAGE_RECEIVED',

    // FetchAction
    FETCH_APPLICATIONS_ASYNC = 'FETCH_APPLICATIONS_ASYNC',
    FETCH_APPLICATIONS_FULFILLED = 'FETCH_APPLICATIONS_FULFILLED',
    FETCH_ENTITIES_ASYNC = 'FETCH_ENTITIES_ASYNC',
    FETCH_ENTITIES_FULFILLED = 'FETCH_ENTITIES_FULFILLED',
    FETCH_ACTIONS_ASYNC = 'FETCH_ACTIONS_ASYNC',
    FETCH_ACTIONS_FULFILLED = 'FETCH_ACTIONS_FULFILLED',
    FETCH_CHAT_SESSIONS_ASYNC = 'FETCH_CHAT_SESSIONS_ASYNC',
    FETCH_CHAT_SESSIONS_FULFILLED = 'FETCH_CHAT_SESSIONS_FULFILLED',
    FETCH_TRAIN_DIALOGS_ASYNC = 'FETCH_TRAIN_DIALOGS_ASYNC',
    FETCH_TRAIN_DIALOGS_FULFILLED = 'FETCH_TRAIN_DIALOGS_FULFILLED',
    FETCH_LOG_DIALOGS_ASYNC = 'FETCH_LOG_DIALOGS_ASYNC',
    FETCH_LOG_DIALOGS_FULFILLED = 'FETCH_LOG_DIALOGS_FULFILLED',
    FETCH_TEACH_SESSIONS_ASYNC = 'FETCH_TEACH_SESSIONS_ASYNC',
    FETCH_TEACH_SESSIONS_FULFILLED = 'FETCH_TEACH_SESSIONS_FULFILLED',
    
    // CreateActions
    CREATE_BLIS_APPLICATION_ASYNC = 'CREATE_BLIS_APPLICATION_ASYNC',
    CREATE_BLIS_APPLICATION_FULFILLED = 'CREATE_BLIS_APPLICATION_FULFILLED',
    CREATE_ENTITY_ASYNC = 'CREATE_ENTITY_ASYNC',
    CREATE_ENTITY_FULFILLED = 'CREATE_ENTITY_FULFILLED',
    CREATE_ENTITY_FULFILLEDPOSITIVE = 'CREATE_ENTITY_FULFILLEDPOSITIVE',  
    CREATE_ENTITY_FULFILLEDNEGATIVE = 'CREATE_ENTITY_FULFILLEDNEGATIVE',
    CREATE_REVERSIBLE_ENTITY = 'CREATE_REVERSIBLE_ENTITY',
    CREATE_ACTION_ASYNC = 'CREATE_ACTION_ASYNC',
    CREATE_ACTION_FULFILLED = 'CREATE_ACTION_FULFILLED',
    CREATE_TRAIN_DIALOG = 'CREATE_TRAIN_DIALOG',
    CREATE_LOG_DIALOG = 'CREATE_LOG_DIALOG',  
    CREATE_CHAT_SESSION_ASYNC = 'CREATE_CHAT_SESSION_ASYNC',
    CREATE_CHAT_SESSION_FULFILLED = 'CREATE_CHAT_SESSION_FULFILLED',
    CREATE_TEACH_SESSION_ASYNC = 'CREATE_TEACH_SESSION_ASYNC',
    CREATE_TEACH_SESSION_FULFILLED = 'CREATE_TEACH_SESSION_FULFILLED',

    // DeleteAction 
    DELETE_BLIS_APPLICATION_ASYNC = 'DELETE_BLIS_APPLICATION_ASYNC',
    DELETE_BLIS_APPLICATION_FULFILLED = 'DELETE_BLIS_APPLICATION_FULFILLED',
    DELETE_ENTITY_ASYNC = 'DELETE_ENTITY_ASYNC',
    DELETE_REVERSE_ENTITY_ASYNC = 'DELETE_REVERSE_ENTITY_ASYNC', 
    DELETE_ENTITY_FULFILLED = 'DELETE_ENTITY_FULFILLED',
    DELETE_ACTION_ASYNC = 'DELETE_ACTION_ASYNC',
    DELETE_ACTION_FULFILLED = 'DELETE_ACTION_FULFILLED',
    DELETE_TRAIN_DIALOG_ASYNC = 'DELETE_TRAIN_DIALOG_ASYNC',
    DELETE_TRAIN_DIALOG_FULFILLED = 'DELETE_TRAIN_DIALOG_FULFILLED',
    DELETE_LOG_DIALOG_ASYNC = 'DELETE_LOG_DIALOG_ASYNC',
    DELETE_LOG_DIALOG_FULFILLED = 'DELETE_LOG_DIALOG_FULFILLED',
    DELETE_CHAT_SESSION_ASYNC = 'DELETE_CHAT_SESSION_ASYNC',
    DELETE_CHAT_SESSION_FULFILLED = 'DELETE_CHAT_SESSION_FULFILLED',
    DELETE_TEACH_SESSION_ASYNC = 'DELETE_TEACH_SESSION_ASYNC',
    DELETE_TEACH_SESSION_FULFILLED = 'DELETE_TEACH_SESSION_FULFILLED',
    DELETE_OPERATION_FULFILLED = 'DELETE_OPERATION_FULFILLED',

    //TeachAction
    RUN_EXTRACTOR_ASYNC = 'RUN_EXTRACTOR_ASYNC',
    RUN_EXTRACTOR_FULFILLED = 'RUN_EXTRACTOR_FULFILLED',
    UPDATE_EXTRACT_RESPONSE = 'UPDATE_EXTRACT_RESPONSE',
    REMOVE_EXTRACT_RESPONSE = 'REMOVE_EXTRACT_RESPONSE',
    RUN_SCORER_ASYNC = 'RUN_SCORER_ASYNC',
    RUN_SCORER_FULFILLED = 'RUN_SCORER_FULFILLED',
    POST_SCORE_FEEDBACK_ASYNC = 'POST_SCORE_FEEDBACK_ASYNC',
    POST_SCORE_FEEDBACK_FULFILLED = 'POST_SCORE_FEEDBACK_FULFILLED',
    TEACH_MESSAGE_RECEIVED = 'TEACH_MESSAGE_RECEIVED',
    TOGGLE_AUTO_TEACH = 'TOGGLE_AUTO_TEACH'
} 


