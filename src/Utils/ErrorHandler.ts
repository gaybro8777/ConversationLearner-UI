/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import { AT } from '../types/ActionTypes'
import * as CLM from '@conversationlearner/models'

export interface ErrorCallback {
    actionType: AT;
    callback: ((actionType: AT) => void);
    guid?: string;
}

export class ErrorHandler {
    private static callbacks: ErrorCallback[] = [];

    public static registerCallbacks(callbacks: ErrorCallback[]): string {
        const guid = CLM.ModelUtils.generateGUID();

        callbacks.forEach(cb => {
            cb.guid = guid;
            this.callbacks.push(cb);
        });

        return guid;
    }

    public static deleteCallbacks(guid: string): void {
        this.callbacks = this.callbacks.filter(cb => cb.guid !== guid);
    }

    public static handleError(actionType: AT) {
        const callbacks = this.callbacks.filter(cb => cb.actionType === actionType);
        callbacks.forEach(cb => cb.callback(actionType));
    }
}