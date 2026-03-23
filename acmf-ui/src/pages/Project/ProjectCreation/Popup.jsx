import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Popup = ({
  isLoading,
  statusMessage,
  onClose,
  setNext,
  next,
  statusCode,
}) => {
  const getStatusMessage = () => {
    const status = Number(statusCode);
    if (status >= 0 && status < 300) {
      return "Success!";
    }
    return `Status: ${status} `;
  };
  const handleClose = () => {
    onClose(); 
    window.location.reload(); 
  };

  return (
    <>
      {isLoading && (
        <AlertDialog open={isLoading} onOpenChange={() => {}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Loading...</AlertDialogTitle>
              <AlertDialogDescription>
                Please wait while we process your request.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" disabled>
                Loading...
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {(statusMessage || statusCode) && (
        <AlertDialog
          open={Boolean(statusMessage || statusCode)}
          onOpenChange={() => onClose()}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{getStatusMessage()}</AlertDialogTitle>
              <AlertDialogDescription>{statusMessage || " "}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleClose()}>
                Close
              </AlertDialogCancel>
              {statusCode >= 0 && statusCode < 300 && (
                <NavLink onClick={() => setNext(!next)}>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </NavLink>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default Popup;
