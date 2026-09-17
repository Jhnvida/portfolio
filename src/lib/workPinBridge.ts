export interface WorkPinHandlers {
    onEnter: () => void;
    onLeave: () => void;
    onEnterBack: () => void;
    onLeaveBack: () => void;
    onPinSetupDone: (pinCreated: boolean) => void;
}

let _handlers: WorkPinHandlers | null = null;

export function registerWorkPinHandlers(handlers: WorkPinHandlers): void {
    _handlers = handlers;
}

export function getWorkPinHandlers(): WorkPinHandlers | null {
    return _handlers;
}

export function resetWorkPinBridge(): void {
    _handlers = null;
}
