import * as React from "react";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Avatar, Button, IconButton } from "@mui/material";
import { getUsers } from "../services/userServices";
import { theme } from "../themes/myTheme";
import { usePermissions } from "../context/permissionsContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

//custom filter operators
const filterOperators = getGridStringOperators().filter(({ value }) => {
  const allowed = ["contains", "equals"];
  return allowed.indexOf(value.toLowerCase()) !== -1;
});

const getColumns = (permissions: any) => {
  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "User",
      width: 80,
      sortable: false,
      filterable: false,
      // filterOperators, //filter string values by contains or equals with operator
      disableColumnMenu: true,

      renderCell: (params) => {
        return <Avatar alt="Remy Sharp" src={params.row.profile_picture} />;
      },
      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "first_name",
      headerName: "first_name",
      width: 130,
      filterOperators,
      disableColumnMenu: true,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "last_name",
      headerName: "last_name",
      width: 130,
      filterOperators,
      disableColumnMenu: true,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "email",
      headerName: "email",
      width: 130,
      filterOperators,
      disableColumnMenu: true,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "username",
      headerName: "username",
      width: 130,
      filterOperators,
      disableColumnMenu: true,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "phone_number",
      headerName: "phone_number",
      width: 130,
      disableColumnMenu: true,
      filterOperators,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "gender",
      headerName: "gender",
      width: 90,
      disableColumnMenu: true,
      filterOperators,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 90,
      disableColumnMenu: true,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "country",
      headerName: "country",
      width: 130,
      disableColumnMenu: true,
      filterOperators,

      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "occupation",
      headerName: "occupation",
      width: 130,
      disableColumnMenu: true,
      filterOperators,
      renderHeader: (params) => (
        <u>
          <strong>{params.field} </strong>
        </u>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      filterable: false,

      disableColumnMenu: true,
      hide: !permissions.canWrite(),
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={(e: any) => {
                window.location.href = `/userEdit/${params.id}`;
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return columns;
};

export default function UsersTable() {
  const { permissions } = usePermissions();
  const navigate = useNavigate();
  const [pageState, setPageState] = React.useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [selectionModel, setSelectionModel] = React.useState<any>([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const columns = React.useMemo(() => {
    return getColumns(permissions);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      getUsers(pageState.page, pageState.pageSize).then((res) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: res.data,
          total: Number(res.headers["x-total-count"]),
        }));
      });
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  const onFilterChange = React.useCallback((filterModel: any) => {
    setPageState((old) => ({ ...old, isLoading: true }));
    getUsers(pageState.page, pageState.pageSize, filterModel).then((res) => {
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: res.data,
        total: Number(res.headers["x-total-count"]),
      }));
    });
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {selectedRows.length > 0 && permissions.canDelete() && (
        <Button
          color="error"
          fullWidth
          variant="outlined"
          onClick={() => {
            alert(
              "the package json server not supported delete route for more than 1 ID params."
            );
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
      <DataGrid
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
          panel: {
            placement: "bottom-start",
            sx: {
              "& .MuiDataGrid-filterForm": {
                bgcolor: theme.primary.light,
              },
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            bgcolor: theme.primary.light,
          },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        rows={pageState.data}
        columns={columns}
        rowsPerPageOptions={[10, 20, 30]}
        checkboxSelection
        loading={pageState.isLoading}
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        pagination
        rowCount={pageState.total}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        paginationMode="server"
        onPageChange={(newPage) =>
          setPageState((old) => ({ ...old, page: newPage + 1 }))
        }
        onPageSizeChange={(newPageSize) =>
          setPageState((old) => ({ ...old, pageSize: newPageSize }))
        }
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        experimentalFeatures={{ newEditingApi: true }}
        selectionModel={selectionModel}
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          newSelectionModel.length > 1
            ? setSelectedRows(newSelectionModel as [])
            : setSelectedRows([]);
        }}
      />
    </Box>
  );
}
