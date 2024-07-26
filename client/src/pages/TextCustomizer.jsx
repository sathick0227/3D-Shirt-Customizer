import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import WcIcon from "@mui/icons-material/Wc";
import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Box, Button, Grid, Typography } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import ImageRender from "../components/ImageRender";
import { ColorPicker } from "../components";
import { EditorTabs, DecalTypes, FilterTabs } from "../config/constants";
import { Tab, FilePicker } from "../components";
import { reader } from "../config/helpers";
import state from "../store";
import { useSnapshot } from "valtio";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <WcIcon />,
    2: <CategoryIcon />,
    3: <AutoAwesomeIcon />,
    4: <ShoppingCartIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Choose Gender",
  "Select Product",
  "Customize your Product",
  "Order",
];

export default function TestCustomizer() {
  const snap = useSnapshot(state);
  const [activeSteps, setActiveSteps] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedGender, setSelectedGender] = React.useState("men");
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [activeEditorTab, setActiveEditorTab] = React.useState("");
  const [file, setFile] = React.useState("");
  const [activeFilterTab, setActiveFilterTab] = React.useState();

  const handleStepClick = (index) => {
    if (index <= 3) {
      setActiveIndex(index);
      setActiveSteps(index);
    } else {
      setActiveIndex(index);
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    setActiveFilterTab(type);
  };
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  const generateTabContent = (name) => {
    switch (name) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
            activeFilterTab={activeFilterTab}
          />
        );
      default:
        return null;
    }
  };

  const imgs = [
    { url: "/assets/men.jpg", name: "men" },
    { url: "/assets/women.jpg", name: "women" },
    { url: "/assets/kid.jpg", name: "kids" },
  ];
  const categoryData = [
    {
      name: "Solid Tshirt",
      gender: "men",
      available_size: ["S", "M", "L", "XL"],
      url: "/assets/solids.jpg",
    },
    {
      name: "Oversize Tshirt",
      gender: "men",
      available_size: ["S", "M", "L", "XL"],
      url: "/assets/oversize.jpg",
    },
    {
      name: "Hoodie",
      gender: "men",
      available_size: ["S", "M", "L", "XL"],
      url: "/assets/hoodies.jpg",
    },
    {
      name: "Solid Tshirt",
      gender: "women",
      available_size: ["S", "M", "L", "XL"],
    },
    {
      name: "Oversize Tshirt",
      gender: "women",
      available_size: ["S", "M", "L", "XL"],
    },
    {
      name: "Hoodie",
      gender: "women",
      available_size: ["S", "M", "L", "XL"],
    },
    {
      name: "Solid Tshirt",
      gender: "kids",
      available_size: ["S", "M", "L", "XL"],
    },
    {
      name: "Oversize Tshirt",
      gender: "kids",
      available_size: ["S", "M", "L", "XL"],
    },
  ];
  const renderPage = (index) => {
    switch (index) {
      case 0:
        return (
          <ImageRender
            array={imgs}
            value={selectedGender}
            setValue={setSelectedGender}
          />
        );
        break;
      case 1:
        return (
          <ImageRender
            array={categoryData.filter((i) => i.gender === selectedGender)}
            value={selectedCategory}
            setValue={setSelectedCategory}
          />
        );
        break;
      case 2:
        return (
          <div>
            <div>
              {EditorTabs.map((tab, index) => (
                <Grid
                  key={index}
                  sx={{
                    border: "2px solid black",
                    marginBottom: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography fontWeight="bold" p={1}>
                    {tab.title}
                  </Typography>
                  <Grid p={1} position="relative">
                    {" "}
                    {generateTabContent(tab.name)}
                  </Grid>
                </Grid>
              ))}
            </div>
          </div>
        );
      default:
        return activeIndex;
    }
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Grid pt={3}>
        <Stepper
          alternativeLabel
          activeStep={activeSteps}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, ind) => (
            <Step key={label} onClick={() => handleStepClick(ind)}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid p={3}>
          {steps.map((item, index) => {
            return (
              index === activeIndex && (
                <Box
                  key={index}
                  className={activeSteps !== 2 ? "renderBox" : ""}
                >
                  {renderPage(index)}
                </Box>
              )
            );
          })}
          <Grid py={3} display={"flex"} justifyContent={"flex-end"}>
            {activeIndex !== 0 && (
              <Button
                variant="contained"
                sx={{
                  marginLeft: "10px",
                  backgroundImage:
                    "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
                }}
                onClick={() => handleStepClick(activeIndex - 1)}
              >
                Back
              </Button>
            )}
            {activeIndex < 3 ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: "10px",
                    backgroundImage:
                      "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
                  }}
                  onClick={() => handleStepClick(activeIndex + 1)}
                >
                  Next
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{
                  marginLeft: "10px",
                  backgroundImage:
                    "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
                }}
                onClick={() => handleStepClick(activeIndex + 1)}
              >
                Let's order
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
