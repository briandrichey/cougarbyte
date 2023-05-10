
# x, y , tennis ball id (3 per photo)

using JSON, Plots

# read in the JSON file
data = JSON.parsefile("data.json")

# extract the x, y, and color values from the data
x = [d["x"] for d in data]
y = [d["y"] for d in data]
z = [d["id"] for d in data]
r = [d["r"] for d in data]
g = [d["g"] for d in data]
b = [d["b"] for d in data]

# create the 3D scatter plot
scatter(x, y, g, color = RGB.(g./255, b./255, r./255), ms = 6, legend = false)
xlabel!("x-axis photo")
ylabel!("y-axis photo")
zlabel!("g - value")
title!("CougarByte: 3D Scatter Plot:\n photo position and green value: 0143-0148 ")