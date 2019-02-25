/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react'
import * as OF from 'office-ui-fabric-react'
import * as Util from '../../../Utils/util'
import * as CLM from '@conversationlearner/models'
import { returntypeof } from 'react-redux-typescript'
import actions from '../../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { State, PreBuiltEntities } from '../../../types'
import { CLDropdownOption } from '../CLDropDownOption'
import { FM } from '../../../react-intl-messages'
import { injectIntl, InjectedIntl, InjectedIntlProps } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import Component from './EntityCreatorComponent'

const prebuiltPrefix = 'builtin-'

const initState: ComponentState = {
    entityNameVal: '',
    entityTypeVal: '',
    entityResolverVal: '',
    isPrebuilt: false,
    isMultivalueVal: false,
    isNegatableVal: false,
    isEditing: false,
    enumValues: [undefined, undefined, undefined, undefined, undefined],
    title: '',
    hasPendingChanges: false,
    isConfirmEditModalOpen: false,
    isConfirmDeleteModalOpen: false,
    needPrebuiltWarning: null,
    isDeleteErrorModalOpen: false,
    showValidationWarning: false,
    newOrEditedEntity: null
}

interface ComponentState {
    entityNameVal: string
    entityTypeVal: string
    entityResolverVal: string,
    isPrebuilt: boolean
    isMultivalueVal: boolean
    isNegatableVal: boolean
    isEditing: boolean
    enumValues: (string | undefined)[]
    title: string
    hasPendingChanges: boolean
    isConfirmEditModalOpen: boolean,
    isConfirmDeleteModalOpen: boolean,
    needPrebuiltWarning: string | null,
    isDeleteErrorModalOpen: boolean,
    showValidationWarning: boolean,
    newOrEditedEntity: CLM.EntityBase | null
}

export const getPrebuiltEntityName = (preBuiltType: string): string => {
    return `${prebuiltPrefix}${preBuiltType.toLowerCase()}`
}

class Container extends React.Component<Props, ComponentState> {
    staticEntityOptions: CLDropdownOption[]
    staticResolverOptions: CLDropdownOption[]
    entityOptions: CLDropdownOption[]
    resolverOptions: CLDropdownOption[]

    constructor(props: Props) {
        super(props)
        this.state = { ...initState, entityTypeVal: CLM.EntityType.LUIS, entityResolverVal: this.NONE_RESOLVER }
        this.staticEntityOptions = this.getStaticEntityOptions(this.props.intl)
        this.staticResolverOptions = this.getStaticResolverOptions(this.props.intl)
    }

    getStaticEntityOptions(intl: InjectedIntl): CLDropdownOption[] {
        return [
            {
                key: CLM.EntityType.LUIS,
                text: Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_ENTITYOPTION_LUIS),
                itemType: OF.DropdownMenuItemType.Normal,
                style: 'clDropdown--command'
            },
            {
                key: CLM.EntityType.LOCAL,
                text: Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_ENTITYOPTION_PROG),
                itemType: OF.DropdownMenuItemType.Normal,
                style: 'clDropdown--command'
            },
            {
                key: CLM.EntityType.ENUM,
                text: Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_ENTITYOPTION_ENUM),
                itemType: OF.DropdownMenuItemType.Normal,
                style: 'clDropdown--command'
            },
            {
                key: 'divider',
                text: '-',
                itemType: OF.DropdownMenuItemType.Divider,
                style: 'clDropdown--normal'
            },
            {
                key: 'Header',
                text: 'Pre-Trained',
                itemType: OF.DropdownMenuItemType.Header,
                style: 'clDropdown--normal'
            }
        ]
    }

    get NONE_RESOLVER(): string {
        return this.props.intl.formatMessage({
            id: FM.ENTITYCREATOREDITOR_ENTITY_RESOLVEROPTION_NONE,
            defaultMessage: 'none'
        });
    }

    getStaticResolverOptions(intl: InjectedIntl): CLDropdownOption[] {
        return [
            {
                key: this.NONE_RESOLVER,
                text: this.NONE_RESOLVER,
                itemType: OF.DropdownMenuItemType.Normal,
                style: 'clDropdown--command'
            }
        ]
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.open !== this.props.open) {
            // Build entity options based on current model locale
            const currentAppLocale = nextProps.app.locale
            const preBuiltLocale = PreBuiltEntities.find(entitiesList => entitiesList.locale === currentAppLocale)
            if (!preBuiltLocale) {
                throw new Error(`Could not find locale: ${currentAppLocale} within list of supported locales: ${PreBuiltEntities.map(e => e.locale).join(', ')}`)
            }

            const localePreBuiltOptions = preBuiltLocale.preBuiltEntities
                .map<CLDropdownOption>(entityName =>
                    ({
                        key: entityName,
                        text: entityName,
                        itemType: OF.DropdownMenuItemType.Normal,
                        style: 'clDropdown--normal'
                    }))

            if (nextProps.entity === null) {
                const filteredPreBuiltOptions = localePreBuiltOptions.filter(entityOption => !nextProps.entities.some(e => !e.doNotMemorize && e.entityType === entityOption.key))
                this.entityOptions = [...this.staticEntityOptions, ...filteredPreBuiltOptions]
                this.resolverOptions = [...this.staticResolverOptions, ...localePreBuiltOptions]

                this.setState({
                    ...initState,
                    title: nextProps.intl.formatMessage({
                        id: FM.ENTITYCREATOREDITOR_TITLE_CREATE,
                        defaultMessage: 'Create an Entity'
                    }),
                    entityTypeVal: CLM.EntityType.LUIS,
                    entityResolverVal: nextProps.entityTypeFilter && nextProps.entityTypeFilter !== CLM.EntityType.LUIS ? nextProps.entityTypeFilter : this.NONE_RESOLVER
                });
            } else {
                this.entityOptions = [...this.staticEntityOptions, ...localePreBuiltOptions]
                this.resolverOptions = [...this.staticResolverOptions, ...localePreBuiltOptions]
                let entityType = nextProps.entity.entityType
                let isPrebuilt = CLM.isPrebuilt(nextProps.entity)
                let resolverType = nextProps.entity.resolverType === null ? this.NONE_RESOLVER : nextProps.entity.resolverType

                this.setState({
                    entityNameVal: nextProps.entity.entityName,
                    entityTypeVal: entityType,
                    entityResolverVal: resolverType,
                    isPrebuilt: isPrebuilt,
                    isMultivalueVal: nextProps.entity.isMultivalue,
                    isNegatableVal: nextProps.entity.isNegatible,
                    isEditing: true,
                    title: nextProps.intl.formatMessage({
                        id: FM.ENTITYCREATOREDITOR_TITLE_EDIT,
                        defaultMessage: 'Edit Entity'
                    })
                })
            }
        }
    }

    componentDidUpdate(prevProps: Props, prevState: ComponentState) {
        const entity = this.props.entity
        if (!entity) {
            return
        }

        const isNameChanged = this.state.entityNameVal !== entity.entityName
        const isMultiValueChanged = this.state.isMultivalueVal !== entity.isMultivalue
        const isNegatableChanged = this.state.isNegatableVal !== entity.isNegatible
        const isResolverChanged = entity.entityType === CLM.EntityType.LUIS && this.state.entityResolverVal !== entity.resolverType
        const hasPendingChanges = isNameChanged || isMultiValueChanged || isNegatableChanged || isResolverChanged

        if (prevState.hasPendingChanges !== hasPendingChanges) {
            this.setState({
                hasPendingChanges
            })
        }
    }

    existingEnumId(value: string): string | undefined {
        if (!this.props.entity || !this.props.entity.enumValues) {
            return undefined
        }
        let enumEntity = this.props.entity.enumValues.find(e => e && e.enumValue === value)
        return enumEntity ? enumEntity.enumValueId : undefined
    }

    convertStateToEntity(state: ComponentState): CLM.EntityBase {
        let entityName = this.state.entityNameVal
        let entityType = this.state.entityTypeVal
        let resolverType = this.state.entityResolverVal
        if (this.state.isPrebuilt) {
            entityName = getPrebuiltEntityName(entityType)
        }

        const newOrEditedEntity: CLM.EntityBase = {
            entityId: undefined!,
            entityName,
            resolverType: resolverType,
            createdDateTime: new Date().toJSON(),
            lastModifiedDateTime: new Date().toJSON(),
            isMultivalue: this.state.isMultivalueVal,
            isNegatible: this.state.isNegatableVal,
            negativeId: null,
            positiveId: null,
            entityType,
            version: null,
            packageCreationId: null,
            packageDeletionId: null,
            doNotMemorize: this.state.isPrebuilt
        }

        if (entityType === CLM.EntityType.ENUM) {
            const values: string[] = this.state.enumValues.filter(v => v !== undefined) as string[]
            const enumValues: CLM.EnumValue[] = values.map(enumValue => {
                let enumValueId = this.existingEnumId(enumValue)
                return enumValueId ? { enumValue, enumValueId } : { enumValue }
            })
            newOrEditedEntity.enumValues = enumValues
        }
        // Set entity id if we're editing existing id.
        if (this.state.isEditing && this.props.entity) {
            newOrEditedEntity.entityId = this.props.entity.entityId

            if (newOrEditedEntity.isNegatible) {
                newOrEditedEntity.positiveId = this.props.entity.positiveId
                newOrEditedEntity.negativeId = this.props.entity.negativeId
            }
        }

        return newOrEditedEntity
    }

    @OF.autobind
    async onClickSaveCreate() {
        const newOrEditedEntity = this.convertStateToEntity(this.state)

        let needPrebuildWarning = this.newPrebuilt(newOrEditedEntity)
        let needValidationWarning = false

        // If editing check for validation errors
        if (this.state.isEditing) {
            const appId = this.props.app.appId
            const isMultiValueChanged = this.props.entity ? newOrEditedEntity.isMultivalue !== this.props.entity.isMultivalue : false
            const isNegatableChanged = this.props.entity ? newOrEditedEntity.isNegatible !== this.props.entity.isNegatible : false
            const invalidTrainingDialogIds = await (this.props.fetchEntityEditValidationThunkAsync(appId, this.props.editingPackageId, newOrEditedEntity) as any as Promise<string[]>)
            needValidationWarning = (isMultiValueChanged || isNegatableChanged || (invalidTrainingDialogIds && invalidTrainingDialogIds.length > 0))
        }

        if (needPrebuildWarning || needValidationWarning) {
            this.setState(
                {
                    isConfirmEditModalOpen: needValidationWarning,
                    showValidationWarning: needValidationWarning,
                    needPrebuiltWarning: needPrebuildWarning,
                    newOrEditedEntity: newOrEditedEntity
                })
        }
        // Save and close
        else {
            this.saveAndClose(newOrEditedEntity)
        }
    }

    @OF.autobind
    onClosePrebuiltWarning(): void {
        this.setState({
            showValidationWarning: false
        })
        if (this.state.newOrEditedEntity) {
            this.saveAndClose(this.state.newOrEditedEntity)
        }
    }

    saveAndClose(newOrEditedEntity: CLM.EntityBase) {
        const appId = this.props.app.appId

        if (!this.state.isEditing) {
            this.props.createEntityThunkAsync(appId, newOrEditedEntity)
            this.props.handleClose()
            return
        }
        else {
            // We know props.entity is valid because we're not editing
            this.props.editEntityThunkAsync(appId, newOrEditedEntity, this.props.entity!)
            this.props.handleClose()
        }
    }

    onClickCancel = () => {
        this.props.handleClose()
    }

    onChangedName = (text: string) => {
        this.setState({
            entityNameVal: text
        })
    }

    onChangedType = (obj: CLDropdownOption) => {
        const isPrebuilt = obj.key !== CLM.EntityType.LUIS && obj.key !== CLM.EntityType.LOCAL && obj.key !== CLM.EntityType.ENUM
        const isNegatableVal = isPrebuilt ? false : this.state.isNegatableVal
        const isMultivalueVal = this.state.isMultivalueVal

        const entityTypeVal = isPrebuilt ? obj.text : obj.key as string
        this.setState(prevState => ({
            isPrebuilt,
            isMultivalueVal,
            isNegatableVal,
            entityTypeVal,
            entityNameVal: isPrebuilt ? getPrebuiltEntityName(obj.text) : prevState.isPrebuilt ? "" : prevState.entityNameVal,
        }))
    }
    onChangedEnum = (index: number, value: string) => {
        let enumValues = [...this.state.enumValues]
        enumValues[index] = value.toUpperCase()
        this.setState({
            enumValues
        })
    }
    onChangeResolverType = (obj: CLDropdownOption) => {
        this.setState({
            entityResolverVal: obj.text
        })
    }
    onChangeMultivalue = () => {
        this.setState(prevState => ({
            isMultivalueVal: !prevState.isMultivalueVal,
        }))
    }
    onChangeReversible = () => {
        this.setState(prevState => ({
            isNegatableVal: !prevState.isNegatableVal,
        }))
    }

    onGetNameErrorMessage = (value: string): string => {
        const { intl } = this.props

        if (value.length === 0) {
            return Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_FIELDERROR_REQUIREDVALUE)
        }

        if (!/^[a-zA-Z0-9-]+$/.test(value)) {
            return Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_FIELDERROR_ALPHANUMERIC)
        }

        // Check that name isn't in use
        if (!this.state.isEditing) {
            let foundEntity = this.props.entities.find(e => e.entityName === this.state.entityNameVal);
            if (foundEntity) {
                if (CLM.isPrebuilt(foundEntity)
                    && typeof foundEntity.doNotMemorize !== 'undefined'
                    && foundEntity.doNotMemorize) {
                    return ''
                }
                return Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_FIELDERROR_DISTINCT)
            }
        }

        if (!this.state.isPrebuilt && (value.toLowerCase().substring(0, prebuiltPrefix.length) === prebuiltPrefix)) {
            return Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_FIELDERROR_RESERVED)
        }

        return ''
    }

    onGetEnumErrorMessage = (value: string): string => {
        const { intl } = this.props

        if (value.length === 0) {
            return ''
        }

        if (!/^[a-zA-Z0-9-]+$/.test(value)) {
            return Util.formatMessageId(intl, FM.ENTITYCREATOREDITOR_FIELDERROR_ALPHANUMERIC)
        }

        return ''
    }

    isEnumDuplicate = (value: string): boolean => {
        if (!value) {
            return false
        }
        return (this.state.enumValues.filter(v => v === value).length > 1)
    }

    onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // On enter attempt to create the entity as long as name is set
        if (event.key === 'Enter' && this.onGetNameErrorMessage(this.state.entityNameVal) === '') {
            this.onClickSaveCreate();
        }
    }

    getDisqualifiedActions(): CLM.ActionBase[] {
        const { actions: allActions, entity } = this.props
        return !entity
            ? []
            : allActions.filter(a => a.negativeEntities.some(id => id === entity.entityId))
    }

    getRequiredActions(): CLM.ActionBase[] {
        const { actions: allActions, entity } = this.props
        return !entity
            ? []
            : allActions.filter(a => a.requiredEntities.find(id => id === entity.entityId))
    }

    onRenderOption = (option: CLDropdownOption): JSX.Element => {
        return (
            <div className="dropdownExample-option">
                <span className={option.style}>{option.text}</span>
            </div>
        );
    }

    isInUse(): boolean {
        return this.isUsedByActions() || this.isUsedByTrainingDialogs()
    }

    isRequiredForActions(): boolean {
        const { actions: allActions, entity } = this.props
        return !entity
            ? false
            : allActions.some(a => [...a.requiredEntitiesFromPayload, ...(a.suggestedEntity ? [a.suggestedEntity] : [])].includes(entity.entityId))
    }

    isUsedByActions(): boolean {
        const { actions: allActions, entity } = this.props
        return !entity
            ? false
            : allActions.some(a => [...a.negativeEntities, ...a.requiredEntities, ...(a.suggestedEntity ? [a.suggestedEntity] : [])].includes(entity.entityId))
    }

    isUsedByTrainingDialogs(): boolean {
        const { entity } = this.props
        return !entity
            ? false
            : JSON.stringify(this.props.trainDialogs).includes(entity.entityId)
    }

    @OF.autobind
    async onClickDelete() {
        // Check if used by actions (ok if used by TrainDialogs)
        if (this.isRequiredForActions()) {
            this.setState({
                isDeleteErrorModalOpen: true
            })
            return
        }

        if (!this.props.entity) {
            console.warn(`You attempted to delete an entity, but entity prop was not given. This should not be possible. Contact support`)
            return
        }

        try {
            const invalidTrainingDialogIds = await ((this.props.fetchEntityDeleteValidationThunkAsync(this.props.app.appId, this.props.editingPackageId, this.props.entity.entityId) as any) as Promise<string[]>)
            this.setState({
                isConfirmDeleteModalOpen: true,
                showValidationWarning: invalidTrainingDialogIds.length > 0
            })
        }
        catch (e) {
            const error = e as Error
            console.warn(`Error when attempting to validate delete: `, error)
        }
    }

    @OF.autobind
    onCancelDelete() {
        this.setState({
            isConfirmDeleteModalOpen: false,
            isDeleteErrorModalOpen: false
        })
    }

    @OF.autobind
    onConfirmDelete() {
        const entity = this.props.entity
        if (!entity) {
            console.warn(`You confirmed delete, but the entity prop was not provided. This should not be possible. Contact Support`)
            return
        }

        this.setState({
            isConfirmDeleteModalOpen: false
        }, () => {
            this.props.handleDelete(entity)
        })
    }

    @OF.autobind
    onCancelEdit() {
        this.setState({
            isConfirmEditModalOpen: false,
            newOrEditedEntity: null
        })
    }

    newPrebuilt(newOrEditedEntity: CLM.EntityBase): string | null {
        // Check resolvers
        if (newOrEditedEntity.resolverType && newOrEditedEntity.resolverType !== "none") {

            let resolverType = newOrEditedEntity.resolverType
            let existingBuiltIn = this.props.entities.find(e =>
                e.resolverType === resolverType ||
                e.entityType === resolverType)

            if (!existingBuiltIn) {
                return resolverType
            }
        }

        // Check prebuilts
        if (this.state.isPrebuilt) {

            // If a prebuilt - entity name is prebuilt name
            let existingBuiltIn = this.props.entities.find(e =>
                e.resolverType === newOrEditedEntity.entityType ||
                e.entityType === newOrEditedEntity.entityType)

            if (!existingBuiltIn) {
                return newOrEditedEntity.entityName
            }
        }
        return null
    }

    @OF.autobind
    onConfirmEdit() {
        if (!this.state.newOrEditedEntity) {
            console.warn(`You confirmed the edit, but the newOrEditedEntity state was not available. This should not be possible. Contact Support`)
            return
        }

        this.setState({
            isConfirmEditModalOpen: false,
            newOrEditedEntity: null
        })

        if (!this.state.needPrebuiltWarning) {
            this.saveAndClose(this.state.newOrEditedEntity)
        }
    }

    @OF.autobind
    onClickTrainDialogs() {
        const { history } = this.props
        history.push(`/home/${this.props.app.appId}/trainDialogs`, { app: this.props.app, entityFilter: this.props.entity })
    }

    isSaveDisabled() {
        if (this.state.entityTypeVal === CLM.EntityType.ENUM) {
            // Enum must have at least 2 values
            let values = this.state.enumValues.filter(v => v)
            if (values.length < 2) {
                return true
            }
            let invalid = this.state.enumValues.filter(v => v && (this.onGetEnumErrorMessage(v) || this.isEnumDuplicate(v)))
            if (invalid.length > 0) {
                return true
            }
        }
        return (this.onGetNameErrorMessage(this.state.entityNameVal) !== '')
    }

    render() {
        const { intl } = this.props
        // const isEntityInUse = this.state.isEditing && this.isInUse()

        const title = this.props.entity
            ? this.props.entity.entityName
            : this.state.title

        const name = this.state.isPrebuilt
            ? getPrebuiltEntityName(this.state.entityTypeVal)
            : this.state.entityNameVal

        const isSaveButtonDisabled = this.isSaveDisabled()
            || (!!this.props.entity && !this.state.hasPendingChanges)

        return <Component
            open={this.props.open}
            title={title}
            intl={intl}
            entityOptions={this.entityOptions}

            entityTypeKey={this.state.entityTypeVal}
            isTypeDisabled={this.state.isEditing || this.props.entityTypeFilter != null}
            onChangedType={this.onChangedType}

            name={name}
            isNameDisabled={this.state.isPrebuilt}
            onGetNameErrorMessage={this.onGetNameErrorMessage}
            onChangedName={this.onChangedName}
            onKeyDownName={this.onKeyDownName}

            isMultiValue={this.state.isMultivalueVal}
            isMultiValueDisabled={false}
            onChangeMultiValue={this.onChangeMultivalue}

            isNegatable={this.state.isNegatableVal}
            onChangeNegatable={this.onChangeReversible}

            isEditing={this.state.isEditing}
            requiredActions={this.getRequiredActions()}
            disqualifiedActions={this.getDisqualifiedActions()}

            onClickTrainDialogs={this.onClickTrainDialogs}

            isSaveButtonDisabled={isSaveButtonDisabled}
            onClickSaveCreate={this.onClickSaveCreate}

            onClickCancel={this.onClickCancel}

            isConfirmDeleteModalOpen={this.state.isConfirmDeleteModalOpen}
            isDeleteErrorModalOpen={this.state.isDeleteErrorModalOpen}
            showDelete={this.state.isEditing && !!this.props.handleDelete}
            onClickDelete={this.onClickDelete}
            onCancelDelete={this.onCancelDelete}
            onConfirmDelete={this.onConfirmDelete}

            isConfirmEditModalOpen={this.state.isConfirmEditModalOpen}
            onCancelEdit={this.onCancelEdit}
            onConfirmEdit={this.onConfirmEdit}

            showValidationWarning={this.state.showValidationWarning}

            needPrebuiltWarning={this.state.needPrebuiltWarning}
            onClosePrebuiltWarning={this.onClosePrebuiltWarning}

            selectedResolverKey={this.state.entityResolverVal}
            resolverOptions={this.resolverOptions}
            onResolverChanged={this.onChangeResolverType}

            enumValues={this.state.enumValues}
            onChangedEnum={this.onChangedEnum}
            onGetEnumErrorMessage={this.onGetEnumErrorMessage}
            isEnumDuplicate={this.isEnumDuplicate}
        />
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        createEntityThunkAsync: actions.entity.createEntityThunkAsync,
        editEntityThunkAsync: actions.entity.editEntityThunkAsync,
        fetchApplicationTrainingStatusThunkAsync: actions.app.fetchApplicationTrainingStatusThunkAsync,
        fetchEntityDeleteValidationThunkAsync: actions.entity.fetchEntityDeleteValidationThunkAsync,
        fetchEntityEditValidationThunkAsync: actions.entity.fetchEntityEditValidationThunkAsync
    }, dispatch);
}
const mapStateToProps = (state: State, ownProps: any) => {
    return {
        entities: state.entities,
        actions: state.actions,
        trainDialogs: state.trainDialogs
    }
}

export interface ReceivedProps {
    app: CLM.AppBase,
    editingPackageId: string,
    open: boolean,
    entity: CLM.EntityBase | null,
    entityTypeFilter: CLM.EntityType | null
    handleClose: () => void,
    handleDelete: (entity: CLM.EntityBase) => void
}

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps & ReceivedProps & InjectedIntlProps & RouteComponentProps<any>

export default connect<typeof stateProps, typeof dispatchProps, ReceivedProps>(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(Container)))