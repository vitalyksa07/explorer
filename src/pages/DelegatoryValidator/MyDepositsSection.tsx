import {
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {Types} from "aptos";
import React from "react";
import TimestampValue from "../../components/IndividualPageContent/ContentValue/TimestampValue";
import GeneralTableBody from "../../components/Table/GeneralTableBody";
import GeneralTableCell from "../../components/Table/GeneralTableCell";
import GeneralTableHeaderCell from "../../components/Table/GeneralTableHeaderCell";
import GeneralTableRow from "../../components/Table/GeneralTableRow";
import MyDepositsStatusTooltip from "./Components/MyDepositsStatusTooltip";
import {getLockedUtilSecs} from "./utils";

type MyDepositsSectionProps = {
  accountResource?: Types.MoveResource | undefined;
};

const MyDepositsCells = Object.freeze({
  amount: AmountCell,
  status: StatusCell,
  unlockDate: UnlockDateCell,
  rewardEarned: RewardEarnedCell,
  actions: ActionsCell,
});

type Column = keyof typeof MyDepositsCells;

const MyDepositsHeader: {[key in Column]: string} = Object.freeze({
  amount: "Amount",
  status: "Status",
  unlockDate: "Unlock Date",
  rewardEarned: "Reward Earned",
  actions: "Actions",
});

const DEFAULT_COLUMNS: Column[] = [
  "amount",
  "status",
  "unlockDate",
  "rewardEarned",
  "actions",
];

const DEFAULT_COLUMNS_MOBILE: Column[] = [
  "amount",
  "status",
  "unlockDate",
  "rewardEarned",
];

function AmountCell({}: MyDepositsSectionProps) {
  return (
    <GeneralTableCell>
      <Typography>? APT</Typography>
    </GeneralTableCell>
  );
}

function StatusCell({}: MyDepositsSectionProps) {
  return <GeneralTableCell>Staked</GeneralTableCell>;
}

function UnlockDateCell({accountResource}: MyDepositsSectionProps) {
  const lockedUntilSecs = getLockedUtilSecs(accountResource);
  return (
    <GeneralTableCell>
      <TimestampValue timestamp={lockedUntilSecs?.toString()!} />
    </GeneralTableCell>
  );
}

function RewardEarnedCell({}: MyDepositsSectionProps) {
  return (
    <GeneralTableCell>
      <Typography>? APT</Typography>
    </GeneralTableCell>
  );
}

function ActionsCell({}: MyDepositsSectionProps) {
  return (
    <GeneralTableCell>
      <Button variant="contained">
        <Typography>UNSTAKE</Typography>
      </Button>
    </GeneralTableCell>
  );
}

export default function MyDepositsSection({
  accountResource,
}: MyDepositsSectionProps) {
  const theme = useTheme();
  const isOnMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const columns = isOnMobile ? DEFAULT_COLUMNS_MOBILE : DEFAULT_COLUMNS;

  return (
    <Stack>
      <Typography variant="h5" marginX={1}>
        My Deposits
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((columnName, idx) => (
              <GeneralTableHeaderCell
                header={MyDepositsHeader[columnName]}
                key={idx}
                tooltip={columnName === "status" && <MyDepositsStatusTooltip />}
              />
            ))}
          </TableRow>
        </TableHead>
        <GeneralTableBody>
          <GeneralTableRow>
            {columns.map((deposit) => {
              const Cell = MyDepositsCells[deposit];
              return <Cell key={deposit} accountResource={accountResource} />;
            })}
          </GeneralTableRow>
        </GeneralTableBody>
      </Table>
    </Stack>
  );
}