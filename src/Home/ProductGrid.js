import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import productService from "../Products/services";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useLanguage } from "../language/LanguageContext";
import HomeBanner from "./HomeBanner";
import productIcon from "../assets/images/product-icon.png";

const colorArray = [
  "#FF5733",
  "#F1C40F",
  "#2C3E50",
  "#3498DB",
  "#8E44AD",
  "#E67E22",
];

const getLayoutConfig = (count) => {
  switch (count) {
    case 2:
      return [{ colSpan: 1 }, { colSpan: 1 }];
    case 3:
      return [{ colSpan: 1 }, { colSpan: 1 }, { colSpan: 2 }];
    case 4:
      return [{ colSpan: 1 }, { colSpan: 1 }, { colSpan: 1 }, { colSpan: 1 }];
    case 5:
      return [
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 2 },
      ];
    default:
      return new Array(count).fill({ colSpan: 1 });
  }
};

const ProductGrid = ({ selectedCategory, selectedCategoryName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.GetProductNamebyCategoryID(
          selectedCategory
        );
        if (response.statusCode === "SUCCESS") {
          setProducts(
            response.data.map((item, index) => ({
              id: item.productNameID,
              name: { en: item.prodEng, si: item.prodSin, ta: item.prodTam },
              color: colorArray[index % colorArray.length],
              ...getLayoutConfig(response.data.length)[index],
            }))
          );
        } else {
          console.error("Failed to fetch products:", response.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const renderGrid = () => {
    const categoryName = selectedCategoryName
      ? selectedCategoryName[language]
      : "";
    const chunkedProducts = [];
    for (let i = 0; i < products.length; i += 6) {
      chunkedProducts.push(products.slice(i, i + 6));
    }

    return (
      <Carousel
        indicators={products.length > 6}
        navButtonsAlwaysVisible={products.length > 6}
        navButtonsProps={{
          style: {
            backgroundColor: "black",
            backgroundTransparency: "50",
            color: "white",
          },
        }}
      >
        {chunkedProducts.map((chunk, slideIndex) => (
          <Box
            key={slideIndex}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2px",
              width: "auto",
              height: "400px",
            }}
          >
            {chunk.map((product) => (
              <Box
                key={product.id}
                sx={{
                  background: `linear-gradient(45deg, ${product.color} 0%, ${product.color}99 50%, ${product.color} 95%)`,
                  backgroundSize: "200% 200%",
                  animation: "gradientAnimation 5s ease infinite",
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderRadius: "10px",
                  padding: 2,
                  gridColumn: `span ${product.colSpan}`,
                  "&:hover": { transform: "scale(1.02)" },
                  "@keyframes gradientAnimation": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                  },
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <Box
                  sx={{
                    width: "50%",
                    maxWidth: "80px",
                    marginBottom: "10px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={productIcon}
                    alt="product"
                    style={{
                      width: "70%",
                      height: "auto",
                      filter: "brightness(0) invert(1)",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {product.name[language] || product.name.en}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Carousel>
    );
  };

  return (
    <Box sx={{ width: "60%", padding: 3 }}>
      {!selectedCategory ? (
        <HomeBanner />
      ) : (
        <>
          <Typography
            variant="h5"
            fontWeight="bold"
            marginBottom={2}
            color="black"
            backgroundColor="white"
            borderRadius={5}
            padding={1}
            textAlign="center"
          >
            {selectedCategory ? `${selectedCategoryName}` : "Select a category"}
          </Typography>
          {loading ? (
            <Typography>Loading products...</Typography>
          ) : (
            renderGrid()
          )}
        </>
      )}
    </Box>
  );
};

export default ProductGrid;
