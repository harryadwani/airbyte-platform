import React from "react";
// import { useWatch } from "react-hook-form";
import { useIntl } from "react-intl";
import * as yup from "yup";

import { Form } from "components/forms";
// import { ModalFormSubmissionButtons } from "components/forms/ModalFormSubmissionButtons";
// import { ModalBody, ModalFooter } from "components/ui/Modal";

import { useNotificationService } from "hooks/services/Notification";
import useRequestConnector from "hooks/services/useRequestConnector";

interface ConnectorRequest {
  connectorType: "source" | "destination";
  name: string;
  additionalInfo?: string;
  email: string;
}

interface RequestConnectorModalProps {
  onSubmit: () => void;
  onCancel: () => void;
  connectorType: ConnectorRequest["connectorType"];
  workspaceEmail?: string;
  searchedConnectorName?: string;
}

const validationSchema = yup.object().shape({
  connectorType: yup.mixed().oneOf(["source", "destination"]),
  name: yup.string().required("form.empty.error"),
  additionalInfo: yup.string(),
  email: yup.string().email("form.email.error").required("form.empty.error"),
});

// const RequestControl = FormControl<ConnectorRequest>;

export const RequestConnectorModal: React.FC<RequestConnectorModalProps> = ({
  onSubmit,
  // onCancel,
  connectorType,
  searchedConnectorName,
  workspaceEmail,
}) => {
  const { formatMessage } = useIntl();
  const notificationService = useNotificationService();
  const { requestConnector } = useRequestConnector();

  const onSubmitBtnClick = async (values: ConnectorRequest) => {
    requestConnector(values);
    notificationService.registerNotification({
      id: "connector.requestConnector.success",
      text: formatMessage({ id: "connector.request.success" }),
      type: "success",
    });
    onSubmit();
  };

  return (
    <Form<ConnectorRequest>
      defaultValues={{
        connectorType,
        name: searchedConnectorName ?? "",
        additionalInfo: "",
        email: workspaceEmail ?? "",
      }}
      schema={validationSchema}
      onSubmit={onSubmitBtnClick}
      trackDirtyChanges
    >
      {/* <ModalBody>
        <RequestControl
          fieldType="dropdown"
          name="connectorType"
          label={formatMessage({ id: "connector.type" })}
          options={[
            { value: "source", label: formatMessage({ id: "connector.source" }) },
            { value: "destination", label: formatMessage({ id: "connector.destination" }) },
          ]}
        />
        <NameControl />
        <RequestControl
          fieldType="textarea"
          name="additionalInfo"
          label={formatMessage({ id: "connector.additionalInfo.label" })}
          description={formatMessage({ id: "connector.additionalInfo.description" })}
          optional
        />
        {!workspaceEmail && (
          <RequestControl fieldType="input" name="email" label={formatMessage({ id: "connector.email" })} />
        )}
      </ModalBody> */}

      {/* <ModalFooter>
        <ModalFormSubmissionButtons
          submitKey="connector.request"
          cancelKey="form.cancel"
          onCancelClickCallback={onCancel}
        />
      </ModalFooter> */}
      <div style={{ padding: "50px" }}>
        Please contact Actuals Support : <br /> <br />
        support@actuals.co.in <br /> <br /> <a href="mailto:support@actuals.co.in">Send email</a>
      </div>
    </Form>
  );
};

// const NameControl = () => {
//   const { formatMessage } = useIntl();
//   const connectorType = useWatch({ name: "connectorType" });

//   return (
//     <RequestControl
//       fieldType="input"
//       name="name"
//       label={
//         connectorType === "destination"
//           ? formatMessage({ id: "connector.requestConnector.destination.name" })
//           : formatMessage({ id: "connector.requestConnector.source.name" })
//       }
//     />
//   );
// };
