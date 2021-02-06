rm(list=ls())

library(tidyverse)

df <- read_csv("Documents/Github/rice-datathon-2021/data/Cleaned_Purchase_Card_Transactions.csv") %>% select(-X1)

cleaned <- df %>% 
  group_by(VENDOR_NAME_NUM) %>%
  mutate(row = row_number()) %>% 
  mutate(minmax = (TRANSACTION_AMOUNT- min(TRANSACTION_AMOUNT)) /(max(TRANSACTION_AMOUNT)-min(TRANSACTION_AMOUNT))) %>% 
  mutate(date = 100*(minmax * log(row))) %>% 
  ungroup()

cleaned %>% 
  write_csv("Documents/Github/rice-datathon-2021/data/Normalized_Purchase_Card_Transactions.csv")

top_vendors <- df %>% 
  group_by(VENDOR_NAME_NUM) %>% 
  tally() %>% 
  arrange(desc(n)) %>% 
  head(20)