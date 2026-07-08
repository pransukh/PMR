import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmationDialogProps } from "../models/shared/ConfirmationDialogProps";

export function confirmationDialog(confirmationService: ConfirmationService, messageService: MessageService, dialogProp: ConfirmationDialogProps) {
    confirmationService.confirm({
        target: dialogProp.event,
        message: dialogProp.confirmationMessage,
        header: dialogProp.confirmationHeader,
        closable: dialogProp.isClosable,
        closeOnEscape: dialogProp.isCloseOnEscape,
        icon: dialogProp.icon,
        rejectButtonProps: dialogProp.rejectButtonProps,
        acceptButtonProps: dialogProp.acceptButtonProps,
        accept: () => {
            if(dialogProp.isShowAcceptMessageToast){
                messageService.add(dialogProp.acceptMessageProps);
            }
            dialogProp.onAccept?.();
        },
        reject: () => {
            if(dialogProp.isShowRejectMessageToast){
                messageService.add(dialogProp.rejectMessageProps);
            }
            dialogProp.onReject?.();
        }
    });
}

