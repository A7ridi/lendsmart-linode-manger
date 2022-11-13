import * as React from 'react';
import { compose } from 'recompose';
import Button from 'src/components/Button';
import Box from 'src/components/core/Box';
import { makeStyles, Theme } from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import Notice from 'src/components/Notice';
import RenderGuard, { RenderGuardProps } from 'src/components/RenderGuard';
import TextField from 'src/components/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  warning: {
    marginTop: theme.spacing(2),
    marginLeft: '0 !important',
  },
}));

interface Props {
  token: string;
  submitting: boolean;
  error?: string;
  twoFactorConfirmed: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

type CombinedProps = Props & RenderGuardProps;

const ConfirmToken: React.FC<CombinedProps> = (props) => {
  const classes = useStyles();

  const {
    token,
    error,
    handleChange,
    onSubmit,
    submitting,
    twoFactorConfirmed,
    onCancel,
  } = props;

  return (
    <React.Fragment>
      <Typography variant="body1" data-qa-copy>
        Please enter the token generated by your 2FA app:
      </Typography>
      <TextField
        value={token}
        errorText={error}
        label="Token"
        onChange={handleChange}
        data-qa-confirm-token
      />
      {twoFactorConfirmed && (
        <Notice
          warning
          spacingTop={16}
          spacingBottom={8}
          className={classes.warning}
          text={
            'Confirming a new key will invalidate codes generated from any previous key.'
          }
        />
      )}
      <Box display="flex" justifyContent="flex-end" style={{ gap: 16 }}>
        <Button buttonType="secondary" onClick={onCancel} data-qa-cancel>
          Cancel
        </Button>
        <Button
          buttonType="primary"
          onClick={onSubmit}
          loading={submitting}
          data-qa-submit
        >
          Confirm Token
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default compose<CombinedProps, Props & RenderGuardProps>(RenderGuard)(
  ConfirmToken
);