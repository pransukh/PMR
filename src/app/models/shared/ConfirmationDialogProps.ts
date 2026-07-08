import { ConfirmationService, MessageService } from "primeng/api";

export type ConfirmationDialogProps = {
    event: HTMLElement,
    confirmationService: ConfirmationService,
    messageService: MessageService,
    confirmationMessage: string,
    confirmationHeader: string,
    icon: string,
    isClosable: boolean,
    isCloseOnEscape: boolean,
    rejectButtonProps: {
        label: string,
        severity: string,
        outlined: boolean
    },
    acceptButtonProps: {
        label: string,
        severity: string,
        outlined: boolean
    },
    isShowAcceptMessageToast: boolean,
    isShowRejectMessageToast: boolean,
    acceptMessageProps: { severity: string, summary: string, detail: string, life: 3000 },
    rejectMessageProps: { severity: string, summary: string, detail: string, life: 3000 },
    onAccept?: () => void;
    onReject?: () => void;
}