
// ==========================================
// CONTACT FORM ELEMENTS
// ==========================================

// Find the button that opens the floating contact form.
const openMessageFormButton =
    document.getElementById("openMessageForm");

// Find the overlay that appears behind the floating contact form.
const messageOverlay =
    document.getElementById("messageOverlay");

// Find the button that closes the floating contact form.
const closeMessageFormButton =
    document.getElementById("closeMessageForm");

// Find the contact form that contains the visitor's details.
const contactForm =
    document.getElementById("contactMessageForm");

// Find the element that displays success and error messages.
const formStatus =
    document.getElementById("messageFormStatus");

// Find the form's submit button so its text and state
// can be changed while the message is being submitted.
const submitButton =
    contactForm.querySelector('button[type="submit"]');

// Store the element that had keyboard focus before the form opened.
// This allows focus to return to that element when the form closes.
let previousFocusedElement = null;

// Track whether the form is currently submitting.
// This prevents duplicate submissions and accidental closing.
let isSubmitting = false;


// ==========================================
// FIELD VALIDATION RULES
// ==========================================

// Store the validation rules for each form field in an array.
//
// Each object specifies:
// - input: the HTML input or textarea element.
// - error: the element that displays the field's error message.
// - label: the field's readable name.
// - min: the minimum permitted character count, when applicable.
// - max: the maximum permitted character count.
// - required: whether the field must contain a value.
// - email: whether the field must contain a valid email address.

const fields = [
    {
        // Visitor's name.
        input: document.getElementById("senderName"),
        error: document.getElementById("senderNameError"),
        label: "Your name",
        min: 2,
        max: 100,
        required: true
    },
    {
        // Visitor's email address.
        input: document.getElementById("senderEmail"),
        error: document.getElementById("senderEmailError"),
        label: "Your email address",
        max: 254,
        required: true,
        email: true
    },
    {
        // Optional subject line for the visitor's message.
        input: document.getElementById("messageSubject"),
        error: document.getElementById("messageSubjectError"),
        label: "Subject",
        max: 150,
        required: false
    },
    {
        // Main message written by the visitor.
        input: document.getElementById("senderMessage"),
        error: document.getElementById("senderMessageError"),
        label: "Your message",
        min: 10,
        max: 5000,
        required: true
    }
];


// ==========================================
// OPEN AND CLOSE THE FLOATING FORM
// ==========================================

// Open the contact form when the visitor clicks its opening button.
openMessageFormButton.addEventListener("click", function () {

    // Remember which element was focused before the form opened.
    previousFocusedElement = document.activeElement;

    // Reveal the overlay and the floating contact form.
    messageOverlay.hidden = false;

    // Move keyboard focus to the name field so the visitor
    // can begin completing the form immediately.
    document.getElementById("senderName").focus();
});


// Close the form when the visitor clicks the close button.
closeMessageFormButton.addEventListener(
    "click",
    closeMessageForm
);


// Close the form when the visitor clicks outside the form itself.
messageOverlay.addEventListener("click", function (event) {

    // Check that the click occurred on the overlay rather than
    // inside the floating contact form.
    if (event.target === messageOverlay) {
        closeMessageForm();
    }
});


// Allow the visitor to close the form using the Escape key.
document.addEventListener("keydown", function (event) {

    // Close the form only when:
// - The Escape key has been pressed.
// - The overlay is currently visible.
// - A message is not being submitted.
    if (
        event.key === "Escape" &&
        !messageOverlay.hidden &&
        !isSubmitting
    ) {
        closeMessageForm();
    }
});


// Define the actions required to close the floating form.
function closeMessageForm() {

    // Keep the form open while a message is being submitted.
    if (isSubmitting) return;

    // Hide the overlay and floating form.
    messageOverlay.hidden = true;

    // Return keyboard focus to the element that opened the form.
    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }
}

// Define the actions required to close the floating form.
function closeMessageForm() {

    // Keep the form open while a message is being submitted.
    if (isSubmitting) return;

    // Hide the overlay and floating form.
    messageOverlay.hidden = true;

    // Return keyboard focus to the element that opened the form.
    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }
}


 
// ==========================================
// KEEP KEYBOARD FOCUS INSIDE THE MODAL
// ==========================================

messageOverlay.addEventListener("keydown", function (event) {

    // Only handle Tab navigation while the modal is open.
    if (event.key !== "Tab" || messageOverlay.hidden) {
        return;
    }

    // Find the dialog inside the overlay.
    const dialog = messageOverlay.querySelector('[role="dialog"]');

    if (!dialog) {
        return;
    }

    // Find visible, enabled elements that can receive keyboard focus.
    const focusableElements = Array.from(
        dialog.querySelectorAll(
            'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
        )
    ).filter(function (element) {
        return element.getClientRects().length > 0 &&
               element.getAttribute("aria-hidden") !== "true";
    });

    // Prevent focus from escaping if no focusable elements exist.
    if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.setAttribute("tabindex", "-1");
        dialog.focus();
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab: wrap backwards from the first element.
    if (
        event.shiftKey &&
        (
            document.activeElement === firstElement ||
            !dialog.contains(document.activeElement)
        )
    ) {
        event.preventDefault();
        lastElement.focus();
    }

    // Tab: wrap forwards from the last element.
    else if (
        !event.shiftKey &&
        (
            document.activeElement === lastElement ||
            !dialog.contains(document.activeElement)
        )
    ) {
        event.preventDefault();
        firstElement.focus();
    }

});

// ==========================================
// DISPLAY FIELD VALIDATION MESSAGES
// ==========================================

// Display an error message beneath a field and mark it invalid.
function showFieldError(field, message) {

    // Insert the appropriate error message into the page.
    field.error.textContent = message;

    // Tell the browser and assistive technologies that
    // the field currently contains invalid information.
    field.input.setAttribute("aria-invalid", "true");
}


// Remove the error message when a field becomes valid.
function clearFieldError(field) {

    // Remove any previously displayed error text.
    field.error.textContent = "";

    // Mark the field as no longer invalid.
    field.input.setAttribute("aria-invalid", "false");
}


// ==========================================
// VALIDATE INDIVIDUAL FIELDS
// ==========================================

// Check whether a field meets its validation requirements.
// Return true if valid, or false if an error is found.
function validateField(field) {

    // Store the HTML element being checked.
    const input = field.input;

    // Remove whitespace from the beginning and end of the value.
    // This prevents spaces alone from being accepted as a name
    // or message.
    input.value = input.value.trim();

    // Store the cleaned value for the checks below.
    const value = input.value;

    // Start with an empty error message.
    let message = "";


    // ------------------------------------------
    // CHECK REQUIRED FIELDS
    // ------------------------------------------

    // Reject required fields that are empty after trimming.
    if (field.required && value.length === 0) {

        // Tell the visitor which field needs completing.
        message =
            "Please enter " + field.label.toLowerCase() + ".";
    }


    // ------------------------------------------
    // CHECK MINIMUM CHARACTER LIMITS
    // ------------------------------------------

    // Reject values that contain fewer characters than allowed.
    else if (
        field.min !== undefined &&
        value.length > 0 &&
        value.length < field.min
    ) {

        // Explain the minimum number of characters required.
        message =
            field.label + " must contain at least " +
            field.min + " characters.";
    }


    // ------------------------------------------
    // CHECK MAXIMUM CHARACTER LIMITS
    // ------------------------------------------

    // Reject values that exceed the permitted character limit.
    else if (
        field.max !== undefined &&
        value.length > field.max
    ) {

        // Explain the maximum number of characters permitted.
        message =
            field.label + " must contain no more than " +
            field.max + " characters.";
    }


    // ------------------------------------------
    // CHECK EMAIL ADDRESS FORMAT
    // ------------------------------------------

    // Use the browser's built-in email validation.
    // This relies on the email field having type="email"
    // in Contact.html.
    else if (
        field.email &&
        value.length > 0 &&
        !input.validity.valid
    ) {

        // Give the visitor an example of an acceptable format.
        message =
            "Please enter a valid email address, " +
            "for example you@example.com.";
    }


    // ------------------------------------------
    // RETURN THE VALIDATION RESULT
    // ------------------------------------------

    // If an error message was created, display it and
    // report that the field is invalid.
    if (message) {
        showFieldError(field, message);
        return false;
    }

    // If every check passes, remove any previous error.
    clearFieldError(field);

    // Report that the field is valid.
    return true;
}


// ==========================================
// VALIDATE FIELDS AS THE VISITOR TYPES
// ==========================================

// Repeat these event listeners for every form field.
fields.forEach(function (field) {

    // Validate a field when the visitor moves away from it.
    field.input.addEventListener("blur", function () {
        validateField(field);
    });

    // Respond when the visitor changes the field's contents.
    field.input.addEventListener("input", function () {

        // Revalidate the field while typing only if it
        // has already been marked as invalid.
        if (
            field.input.getAttribute("aria-invalid") === "true"
        ) {
            validateField(field);
        }
    });
});


// ==========================================
// DISPLAY SUBMISSION FEEDBACK
// ==========================================

// Display a message informing the visitor of the submission
// status, such as successful submission or a sending error.
//
// Parameters:
// - message: the text to display.
// - type: the CSS class used to style the message.
function showFormStatus(message, type) {

    // Insert the message as plain text rather than HTML.
    formStatus.textContent = message;

    // Apply the relevant CSS classes for the status message.
    // For example, "form-status success" or "form-status error".
    formStatus.className = "form-status " + type;
}


// ==========================================
// SUBMIT THE FORM TO FORMSPREE
// ==========================================

// Listen for the visitor submitting the contact form.
// The async keyword allows this function to wait for Formspree's
// response without freezing the page.
contactForm.addEventListener(
    "submit",
    async function (event) {

        // Prevent the browser's default form submission,
        // which would normally reload or navigate the page.
        event.preventDefault();


        // ------------------------------------------
        // PREVENT DUPLICATE SUBMISSIONS
        // ------------------------------------------

        // Stop if a previous submission is still in progress.
        if (isSubmitting) return;


        // Clear any previous success or failure message.
        showFormStatus("", "");


        // ------------------------------------------
        // VALIDATE ALL FIELDS BEFORE SENDING
        // ------------------------------------------

        // Check every field and collect those that are invalid.
        const invalidFields = fields.filter(function (field) {
            return !validateField(field);
        });


        // If any fields are invalid, do not submit the form.
        if (invalidFields.length > 0) {

            // Ask the visitor to correct the highlighted fields.
            showFormStatus(
                "Please correct the highlighted fields before " +
                "sending your message.",
                "error"
            );

            // Move keyboard focus to the first invalid field
            // so the visitor can correct it immediately.
            invalidFields[0].input.focus();

            // Stop the submission process.
            return;
        }


        // ------------------------------------------
        // INDICATE THAT SUBMISSION IS IN PROGRESS
        // ------------------------------------------

        // Record that the form is currently being submitted.
        isSubmitting = true;

        // Disable the button to prevent repeated clicks.
        submitButton.disabled = true;

        // Update the button text to show that the request
        // is being processed.
        submitButton.textContent = "Sending message...";


        // ------------------------------------------
        // SEND THE FORM DATA TO FORMSPREE
        // ------------------------------------------

        // Use try...catch to handle network problems,
        // rejected submissions and unexpected errors.
        try {

            // Send the visitor's form data to the URL
            // specified in the form's action attribute.
            const response = await fetch(contactForm.action, {

                // Use POST to send the form data to Formspree.
                method: "POST",

                // Package the form fields into a FormData object.
                // Formspree receives the submitted field names
                // and their corresponding values.
                body: new FormData(contactForm),

                // Request a JSON response from Formspree.
                headers: {
                    "Accept": "application/json"
                }
            });


            // Create an empty object in case the response
            // does not contain readable JSON.
            let result = {};


            // ------------------------------------------
            // READ FORMSPREE'S RESPONSE
            // ------------------------------------------

            // Attempt to read the response as JSON.
            try {
                result = await response.json();
            } catch {

                // Leave result as an empty object if the response
                // cannot be parsed as JSON.
                // The response status is checked below.
            }


            // ------------------------------------------
            // CHECK WHETHER SUBMISSION FAILED
            // ------------------------------------------

            // response.ok is true for successful HTTP responses.
            // Formspree may also return an errors array when
            // it rejects a submission.
            if (!response.ok || result.errors) {

                // Collect any error messages returned by Formspree.
                const serverMessage = result.errors
                    ?.map(function (error) {
                        return error.message;
                    })
                    .filter(Boolean)
                    .join(" ");


                // Throw an error so the catch block can display
                // the appropriate failure message.
                throw new Error(
                    serverMessage ||
                    "The message could not be submitted. " +
                    "Please try again."
                );
            }


            // ------------------------------------------
            // CONFIRM SUCCESSFUL SUBMISSION
            // ------------------------------------------

            // Tell the visitor that Formspree accepted the message.
            // This does not guarantee that an automatic confirmation
            // email has been delivered to their inbox.
            showFormStatus(
                "Thank you for getting in touch! Your message " +
                "has been submitted successfully, and I appreciate your interest." +
                " Please wait patiently " +
                "while I review your message and get back to you. " +
                "I appreciate your patience.",
                "success"
            );


            // ------------------------------------------
            // RESET THE FORM AFTER SUCCESS
            // ------------------------------------------

            // Clear the visitor's entries from all form fields.
            contactForm.reset();

            // Remove any remaining field-level validation errors.
            fields.forEach(function (field) {
                clearFieldError(field);
            });


        } catch (error) {

            // ------------------------------------------
            // HANDLE SUBMISSION ERRORS
            // ------------------------------------------

            // Record technical details in the browser console
            // to help with troubleshooting during development.
            console.error(
                "Contact form submission failed:",
                error
            );

            // Show a helpful message without exposing
            // technical details to the visitor.
            showFormStatus(
                "Sorry, your message could not be sent. Please " +
                "check your internet connection and try again. " +
                "If the problem continues, please try again later.",
                "error"
            );


        } finally {

            // ------------------------------------------
            // RESTORE THE SUBMIT BUTTON
            // ------------------------------------------

            // Mark the submission process as finished,
            // whether it succeeded or failed.
            isSubmitting = false;

            // Re-enable the submit button so the visitor
            // can send another message if needed.
            submitButton.disabled = false;

            // Restore the button's original text.
            submitButton.textContent = "Send message";
        }
    }
);

