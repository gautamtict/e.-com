import { Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, Slider } from "@mui/material";

export default function FilterPanel({ filters, onTogglePricing, onReset, onPriceRangeChange }) {
  return (
    <Box display="flex" flexDirection="column" gap={2} p={2} sx={{ background: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={filters.keyword}
        onChange={(e) => onTogglePricing({ keyword: e.target.value })}
      />

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={filters.pricing.paid} onChange={() => onTogglePricing({ paid: !filters.pricing.paid })} />}
          label="Paid"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.pricing.free} onChange={() => onTogglePricing({ free: !filters.pricing.free })} />}
          label="Free"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.pricing.viewOnly} onChange={() => onTogglePricing({ viewOnly: !filters.pricing.viewOnly })} />}
          label="View Only"
        />
      </FormGroup>

      {filters.pricing.paid && (
        <Box>
          <Slider
            value={filters.priceRange}
            onChange={(_, val) => onPriceRangeChange(val)}
            valueLabelDisplay="auto"
            min={0}
            max={999}
          />
        </Box>
      )}

      <Button variant="outlined" onClick={onReset}>Reset</Button>
    </Box>
  );
}
